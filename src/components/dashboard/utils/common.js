export const setDashIfEmpty = (item, key, callback) => {
  if (!(key in item) || !item[key]) {
    return '-';
  }
  return callback(item[key]);
};

export const isElementInDOM = (step) => {
  const nodes = document.querySelectorAll(step.selector);
  return nodes.length > 0;
};
