import advlib from 'advlib';
import debugRenderer from 'debug';
import express from 'express';
import isArray from 'lodash/isArray';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import omit from 'lodash/omit';
import { SKITTLES } from './constants';

const debug = debugRenderer('node-hue-prstbt');

const router = express.Router();

router.get('/', async (req, res) => res.json({ get: 'Hello world' }));

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
        .map(({ serviceData: { uuid, data, minew }, ...rest }) => ({
          uuid, data, ...minew, ...rest,
        }))
        .map((data) => omit(data, ['data', 'frameType', 'productModel', 'accelerationX', 'accelerationY', 'macAddress', 'flags', 'complete16BitUUIDs', 'uuid']));

      debug(skittlesInfo);
    } else {
      debug('No skittle sensors', skittles);
    }
  } else {
    debug('No Body or Empty body');
  }
  res.end();
});


module.exports = router;
