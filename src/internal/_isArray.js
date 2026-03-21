/**
 * Checks if its entry is an array.
 *
 * @private
 * @function
 * @param {unknown} arg - Entry that will be checked as array
 * @returns {arg is unknown[]}
 */
export default Array.isArray || function (arg) {
  return Object.prototype.toString.call(arg) === '[object Array]'
}
