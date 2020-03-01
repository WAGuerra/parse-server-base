/**
 * This function adds a cancel callback to any parsed promise.
 *
 * Code extracted from
 * https://github.com/facebook/react/issues/5465#issuecomment-157888325
 * with a small change on returned value.
 *
 * @param promise
 * @return [Promise, cancel function]
 */
export const makeCancelable = <T>(promise:Promise<T>): [Promise<any>,Function] => {
  let hasCanceled_ = false;
  
  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
        val => hasCanceled_ ? reject({isCanceled: true}) : resolve(val),
        error => hasCanceled_ ? reject({isCanceled: true}) : reject(error)
    );
  });
  
  return [
    wrappedPromise,
    () => {
      hasCanceled_ = true;
    }
  ];
};
