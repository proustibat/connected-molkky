import { SKITTLES } from '@routes/api/constants';
import advlib from 'advlib';
import debugRenderer from 'debug';
import express from 'express';
import hasIn from 'lodash/hasIn';
import isArray from 'lodash/isArray';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import omit from 'lodash/omit';

const debug = debugRenderer('node-hue-prstbt');

const router = express.Router();

const lastState = {};

router.post('/', async (req, res) => {
  const { body } = req;
  // Look for data concerning skittles sensors
  if (body && isArray(body) && body.length > 0) {
    const skittles = body.filter((sensor) => Object.keys(SKITTLES).includes(sensor.mac));

    // Look for skittles with raw data and transform raw data
    if (skittles.length > 0) {
      const skittlesInfo = skittles
        .filter((skittle) => !isUndefined(skittle.rawData)
            && !isNull(skittle.rawData)
            && skittle.rawData.length > 0)
        .map(({ mac, rawData }) => ({ mac, ...advlib.ble.data.process(rawData) }))
        .filter((skittle) => hasIn(skittle, 'serviceData.uuid')
            && hasIn(skittle, 'serviceData.data')
            && hasIn(skittle, 'serviceData.minew'))
        .map(({ serviceData: { uuid, data, minew }, ...rest }) => ({
          uuid, data, ...minew, ...rest,
        }))
        .map((data) => omit(data, [
          'data', 'frameType', 'productModel', 'accelerationX', 'accelerationY', 'macAddress', 'flags', 'complete16BitUUIDs', 'uuid',
        ]));

      skittlesInfo.forEach(({ mac, accelerationZ: z, batteryPercent: battery }) => {
        lastState[mac] = {
          ...lastState[mac],
          ...(battery && { battery }),
          ...(z && {
            position: z >= 0.9 ? 'UPRIGHT' : 'KNOCKED_OVER',
            z,
          }),
        };
      });
      const io = req.app.get('socketio');
      io.emit('UPDATE', lastState);
    } else {
      debug('No skittle sensors', skittles);
    }
  } else {
    debug('No Body or Empty body');
  }
  res.end();
});


module.exports = router;
