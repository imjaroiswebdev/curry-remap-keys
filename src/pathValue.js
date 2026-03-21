/**
 * @typedef {import('./types').RemappableObject} RemappableObject
 * @typedef {import('./types').RemappableValue} RemappableValue
 */

/**
 * Returns the value of an object nested key.
 *
 * @private
 * @template {RemappableObject} TObject
 * @param {string[]} path - Keys nesting path from top to lowest level.
 * @param {TObject} obj - Object source that contains the required value.
 * @returns {RemappableValue}
 */
export function pathValue (path, obj) {
  let currentPathLevel = obj
  /** @type {RemappableValue} */
  let result = null

  path.forEach(key => {
    result = currentPathLevel[key]
    currentPathLevel = result
  })

  return result
}
