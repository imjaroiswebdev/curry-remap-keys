export function cloneObj (obj) {
  const clone = Object.create(Object.getPrototypeOf(obj))

  for (let property in obj) {
    if (typeof obj[property] === 'object') {
      clone[property] = cloneObj(obj[property])
    } else {
      const propertyDescriptor = Object.getOwnPropertyDescriptor(obj, property)

      Object.defineProperty(clone, property, propertyDescriptor)
    }
  }

  return clone
}
