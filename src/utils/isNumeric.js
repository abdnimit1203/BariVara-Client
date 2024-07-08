export function isNumericKey(key) {
    return !isNaN(key) && !isNaN(parseFloat(key));
  }