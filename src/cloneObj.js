import _isObject from './internal/_isObject'

export function cloneObj (obj) {
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
