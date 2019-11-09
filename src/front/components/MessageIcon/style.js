import { colorError, colorInfo, colorWarning } from '@root/gStyles';
import { MESSAGE_TYPE } from '@utils/constants';

const mappers = [{
  predicate: (type) => type === MESSAGE_TYPE.WARNING,
  color: colorWarning,
}, {
  predicate: (type) => type === MESSAGE_TYPE.ERROR,
  color: colorError,
}, {
  predicate: (type) => type === MESSAGE_TYPE.INFO,
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
