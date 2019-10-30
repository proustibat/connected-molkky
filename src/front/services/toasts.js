import get from 'lodash/get';

// eslint-disable-next-line import/prefer-default-export
export const toastError = (error) => {
  get(window, 'M.toast', () => {})({ html: error, classes: 'red darken-4' });
};
