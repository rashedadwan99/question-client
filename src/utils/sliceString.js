export const sliceString = (word) => {
  return word.length >= 25 ? word.slice(0, 24) + " ..." : word;
};
