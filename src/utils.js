const __DEV__ = process.env.NODE_ENV === "development";

function debugLog(...params) {
  if (__DEV__) {
    console.log(...params);
  }
}

function cache(name, fn) {
  const tmp = localStorage.getItem(name);
  return new Promise(resolve => {
    if (!__DEV__ || tmp === null || typeof tmp === "undefined") {
      debugLog("cache empty, loading fresh data");
      const retVal = fn();
      if (retVal instanceof Promise) {
        retVal.then(retVal2 => {
          localStorage.setItem(name, JSON.stringify(retVal2));
          resolve(retVal2);
        });
      } else {
        localStorage.setItem(name, JSON.stringify(retVal));
        resolve(retVal);
      }
    } else {
      debugLog("retrieved from cache");
      resolve(JSON.parse(tmp));
    }
  });
}

export { debugLog, cache };
