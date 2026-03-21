import _isObject from './internal/_isObject'

/**
 * @typedef {import('./types').RemappableObject} RemappableObject
 */

/**
 * Deeply clones an object preserving its prototype and property descriptors.
 *
 * @template {RemappableObject} TObject
 * @param {TObject} obj
 * @returns {TObject}
 */
export function cloneObj (obj) {
  /** @type {TObject} */
  const clone = Object.create(Object.getPrototypeOf(obj))

  for (let property in obj) {
    if (_isObject(obj[property])) {
      clone[property] = cloneObj(obj[property])
    } else {
      const propertyDescriptor = Object.getOwnPropertyDescriptor(obj, property)

      Object.defineProperty(clone, property, propertyDescriptor)
    }
  }

  return clone
}
