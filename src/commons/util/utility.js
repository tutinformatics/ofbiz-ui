export function areEqual(obj1, obj2) {
  return Object.keys(obj1).every((key) => obj2.hasOwnProperty(key) && (obj1[key] === obj2[key]));
}

export function safeGet(func, defaultValue) {
  try {
    let value = func();
    return (!!value) ? value : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}
