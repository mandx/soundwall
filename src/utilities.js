export function uniqueByKey(collection, key) {
  const index = {}, result = [];
  collection.forEach(function (item) {
    if (index[item[key]]) {
      Object.assign(index[item[key]], item);
    } else {
      index[item[key]] = item;
      result.push(item);
    }
  });
  return result;
}

export function removeKeys(obj, keys) {
  for (let i = keys.length - 1; i >= 0; i--) {
    delete obj[keys[i]];
  }
  return obj;
}
