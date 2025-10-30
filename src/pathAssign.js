import { cloneObj } from './cloneObj'

import _isObject from './internal/_isObject'

/**
 * @typedef {import('./types').RemappableObject} RemappableObject
 * @typedef {import('./types').RemappableValue} RemappableValue
 */

/**
 * Assigns a value to an object nested key.
 *
 * @private
 * @template {RemappableObject} TObject
 * @param {RemappableValue} value - Assignment to be done.
 * @param {string[]} keysPath - Array with property keys ordered as the
 * path that will be followed to lookup through the nested object levels
 * till the target key.
 * @param {TObject} ogObject - Object that will be updated.
 * @returns {TObject} - New object that is a deep clone of the supplied
 * object.
 */
export function pathAssign (value, keysPath, ogObject) {
  /** @type {TObject} */
  const ogObjectClone = cloneObj(ogObject) // Clone of the original object
  const lastIndex = keysPath.length - 1
  const endKey = keysPath[lastIndex]
  const followPath = keysPath.filter((key, index) => index !== (lastIndex))
  /** @type {RemappableObject} */
  let refToOgObject = ogObjectClone

  followPath.forEach(key => {
    let currentPathLevel = refToOgObject[key]

    if (!(key in refToOgObject) || !_isObject(currentPathLevel)) {
      refToOgObject[key] = {}
    }

    // Self assigning the current key in the path
    // makes that the reference to the original object
    // ogObjectClone maintains its state at this level
    // of the path
    refToOgObject = refToOgObject[key]
  })

  refToOgObject[endKey] = value

  return ogObjectClone
}
