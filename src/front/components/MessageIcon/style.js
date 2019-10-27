import { colorError, colorInfo, colorWarning } from '@root/gStyles';
import constants from '@utils/constants';

const mappers = [{
  predicate: (type) => type === constants.MESSAGE_TYPE.WARNING,
  color: colorWarning,
}, {
  predicate: (type) => type === constants.MESSAGE_TYPE.ERROR,
  color: colorError,
}, {
  predicate: (type) => type === constants.MESSAGE_TYPE.INFO,
  color: colorInfo,
}];

export default {
  container: {
    display: 'flex',
    alignItems: 'center',
  },

  computeStyle: (type) => {
    const { color } = mappers.find((mapper) => mapper.predicate(type));
    return {
      icon: {
        color,
      },
      text: {
        borderBottom: `1px solid ${color}`,
        lineHeight: '1rem',
      },
    };
  },
};
