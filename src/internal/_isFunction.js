/**
 * Checks if its entry is a function.
 *
 * @private
 * @param {object} arg - Entry that will be checked as function
 */
export default function (arg) {
  return Object.prototype.toString.call(arg) === '[object Function]'
}
