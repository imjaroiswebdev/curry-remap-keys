/**
 * Checks if its entry is an object.
 *
 * @private
 * @param {object} arg - Entry that will be checked as object
 */
export default function (arg) {
  return Object.prototype.toString.call(arg) === '[object Object]'
}
