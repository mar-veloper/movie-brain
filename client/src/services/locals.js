const setToLocal = (itemName, item) =>
  localStorage.setItem(itemName, JSON.stringify(item));

const getFromLocal = itemName => JSON.parse(localStorage.getItem(itemName));

export default {
  setToLocal,
  getFromLocal,
};
