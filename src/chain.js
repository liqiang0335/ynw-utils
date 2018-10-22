/**
 * 将函数组成 Promise链调用
 */
export const promiseChain = (...fns) => arg =>
  fns.reduce((p, next) => p.then(next), Promise.resolve(arg));

/**
 * 依次执行队列中的同步或异步函数
 */
export const nextChain = (...args) => fns => {
  let cur = 0;
  const lastIndex = fns.length - 1;
  const next = () => {
    const _next = cur == lastIndex ? f => f : next;
    fns[cur++].apply(null, [...args, _next]);
  };
  next();
};

/**
 * KOA chain
 */
export const koaChain = function(middleware) {
  if (!Array.isArray(middleware))
    throw new TypeError("Middleware stack must be an array!");
  for (const fn of middleware) {
    if (typeof fn !== "function")
      throw new TypeError("Middleware must be composed of functions!");
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function(context, next) {
    // last called middleware #
    let index = -1;
    return dispatch(0);
    function dispatch(i) {
      if (i <= index)
        return Promise.reject(new Error("next() called multiple times"));
      index = i;
      let fn = middleware[i];
      if (i === middleware.length) fn = next;
      if (!fn) return Promise.resolve();
      try {
        return Promise.resolve(
          fn(context, function next() {
            return dispatch(i + 1);
          })
        );
      } catch (err) {
        return Promise.reject(err);
      }
    }
  };
};

export default { promise, next, koa };
