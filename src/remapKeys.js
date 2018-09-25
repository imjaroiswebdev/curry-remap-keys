import { pathAssign } from './pathAssign'
import { followPath } from './followPath'

/**
 * Remaps (rename) the keys of ogObj based on the key-value pair renaming
 * object (mapping - second parameter).
 * @param {Object} mapping Object that defines the remapping of the keys of
 * ogObj and its signature must be a plain key-value pair relation for remapping
 * @param {Object} ogObj Original object that will be receiving one or more of
 * its keys remppaed
 */
export const remapKeys = (mapping, ogObj) => {
  const isValidObject = obj => (typeof obj === 'object' && !(obj instanceof Array))
  const isValidMappingObj = mapping && isValidObject(mapping)
  const isCurrying = typeof ogObj === 'undefined'
  const isValidOriginalObj = isCurrying || isValidObject(ogObj)

  if (isValidMappingObj && Object.keys(mapping).length === 0) {
    return ogObj
  } else if (!isValidMappingObj || !isValidOriginalObj) {
    throw Error('Invalid parameters were supplied')
  } else if (isCurrying) {
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

    Object.keys(mapping).forEach(doKeyRemap) // Will apply the mapping
    ogKeys.forEach(cleaner) // Will clean the result of the original keys

    function doKeyRemap (ogKeyName) {
      let newKeyName = ''
      const remapRule = mapping[ogKeyName]

      const isSimpleRemapRule = (function () {
        // Simple remap: key-value pair representing the remap of a key
        // at the base level of the object.
        return typeof remapRule === 'string' &&
          remapRule.length > 0
      })()

      const isDeepRemapRule = (function () {
        // Deep remap: Array formed by two elements first is new key name
        // and second a path to follow through object keys find the nested
        // key to be remapped.
        return !isSimpleRemapRule &&
          (remapRule instanceof Array && remapRule.length > 0)
      })()

      if (isSimpleRemapRule) {
        newKeyName = mapping[ogKeyName]
        remappedObj[newKeyName] = ogObj[ogKeyName]
      } else if (isDeepRemapRule) {
        newKeyName = remapRule[0]
        const keysPath = remapRule[1]
        const value = followPath(keysPath, ogObj)
        remappedObj = pathAssign(value, keysPath, remappedObj)
      } else {
        throw Error('Invalid parameters were supplied. A remap rule must be a none empty string or Array')
      }
    }

    function cleaner (key) {
      const isBlackListed = blacklist.includes(key)
      if (isBlackListed) {
        return
      }

      cleanObj[key] = ogObj[key]
    }

    const updatedObj = Object.assign({}, cleanObj, remappedObj)

    return updatedObj
  }
}
