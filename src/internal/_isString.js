/**
 * Checks if its entry is a string.
 *
 * @private
 * @param {unknown} arg - Entry that will be checked as string
 * @returns {arg is string}
 */
export default function (arg) {
  return Object.prototype.toString.call(arg) === '[object String]'
}
