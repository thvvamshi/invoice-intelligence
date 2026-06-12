export const isMissing = (value) => {
  if (value === null || value === undefined) {
    return true;
  }

  if (value === "") {
    return true;
  }

  if (value === 0) {
    return true;
  }

  return false;
};