/**
 * Checks if its entry is an string.
 * @param {object} arg - Entry that will be checked as string
 */
export default function (arg) {
  return Object.prototype.toString.call(arg) === '[object String]'
}
