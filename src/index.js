/**
 * Remaps (rename) the keys of ogObj based on the key-value pair renaming
 * object (mapping - second parameter).
 * @param {Object} ogObj Original object that will be receiving one or more of
 * its keys remppaed
 * @param {Object} mapping Object that defines the remapping of the keys of
 * ogObj and its signature must be a plain key-value pair relation for remapping
 */
export const remapKeys = (mapping, ogObj) => {
  const validObject = obj => (typeof obj === 'object' && !(obj instanceof Array))
  const validMappingObj = mapping && validObject(mapping)
  const currying = typeof ogObj === 'undefined'
  const validOriginalObj = currying || validObject(ogObj)

  if (validMappingObj && Object.keys(mapping).length === 0) {
    return ogObj
  } else if (!validMappingObj || !validOriginalObj) {
    throw Error('Invalid parameters were supplied')
  } else if (currying) {
    return remapper(mapping)
  }

  return remapper(mapping)(ogObj)
}

function remapper (mapping) {
  return function (ogObj) {
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
}
