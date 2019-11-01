// eslint-disable-next-line import/prefer-default-export
export const calculatePoints = (knockedSkittles) => (knockedSkittles.length === 1
  ? knockedSkittles[0].value
  : knockedSkittles.length);
