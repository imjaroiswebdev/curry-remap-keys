/**
 * Checks if its entry is a function.
 *
 * @private
 * @param {unknown} arg - Entry that will be checked as function
 * @returns {arg is Function}
 */
export default function (arg) {
  return Object.prototype.toString.call(arg) === '[object Function]'
}
