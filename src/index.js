/**
 * Remaps (rename) the keys of ogObj based on the key-value pair renaming
 * object (mapping - second parameter).
 * @param {Object} ogObj Original object that will be receiving one or more of
 * its keys remppaed
 * @param {Object} mapping Object that defines the remapping of the keys of
 * ogObj and its signature must be a plain key-value pair relation for remapping
 */
export const remapKeys = (mapping, ogObj) => {
  // TODO: Add parameters validation
  // TODO: Add currying support
  let remappedObj = {}
  let cleanObj = {}
  const blacklist = Object.keys(mapping)
  const ogKeys = Object.keys(ogObj)

  Object.keys(mapping).forEach(remapper) // Will apply the mapping
  ogKeys.forEach(cleaner) // Will clean the result of the original keys

  function remapper (key) {
    remappedObj[mapping[key]] = ogObj[key]
  }

  function cleaner (key) {
    if (blacklist.includes(key)) {
      return
    }

    cleanObj[key] = ogObj[key]
  }

  const updatedObj = Object.assign({}, cleanObj, remappedObj)

  return updatedObj
}
