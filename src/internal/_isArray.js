/**
 * Checks if its entry is an array.
 * @param {object} arg - Entry that will be checked as array
 */
export default Array.isArray || function (arg) {
  return Object.prototype.toString.call(arg) === '[object Array]'
}
