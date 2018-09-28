/**
 * Returns the value of an object nested key
 * @param {array} path - Keys nesting path from top to lowest level
 * @param {object} obj - Object to be traveled
 */
export function pathValue (path, obj) {
  let currentPathLevel = obj
  let result = null

  path.forEach(key => {
    result = currentPathLevel[key]
    currentPathLevel = result
  })

  return result
}
