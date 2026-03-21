/**
 * Checks if its entry is an object.
 *
 * @private
 * @param {unknown} arg - Entry that will be checked as object
 * @returns {arg is Record<string, unknown>}
 */
export default function (arg) {
  return Object.prototype.toString.call(arg) === '[object Object]'
}
