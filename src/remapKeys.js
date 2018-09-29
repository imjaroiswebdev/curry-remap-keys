import { pathAssign } from './pathAssign'
import { pathValue } from './pathValue'
import { cloneObj } from './cloneObj'

import _isObject from './internal/_isObject'
import _isString from './internal/_isString'

/**
 * Remaps (rename) the property keys of an object based on a mapping
 * configuration supplied.
 *
 * @param {object} mapping - Object that defines the remapping of the supplied
 * object property keys.
 * @param {object} ogObj - Original object that will be receiving one or more of
 * its keys remapped.
 * @returns {(object|function)} - New object with remapped key(s) or a function
 * configured for remap the keys of its entry. This object maintains the
 * prototype of the original object supplied or if only a mapping configuration
 * its supplied then a function expecting an object for being
 * remapped would be returned.
 * @see README for the signature of the mapping object which varies depending
 * on the kind of remapping.
 */
export function remapKeys (mapping, ogObj) {
  const isValidMappingObj = mapping && _isObject(mapping)
  const isCurrying = typeof ogObj === 'undefined'
  const isValidOriginalObj = isCurrying || _isObject(ogObj)

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
    ogKeys.forEach(cleanOgKeys) // Will clean the result of the original keys

    function doKeyRemap (ogKeyName) {
      let newKeyName = ''
      const remapRule = mapping[ogKeyName]

      const isSimpleRemapRule = (function () {
        // Simple remap: key-value pair representing the remap of a key
        // at the base level of the object.
        return _isString(remapRule) && remapRule.length > 0
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
        const pathTillRemapping = remapRule[1]
        const endOfPathKeys = Object.keys(
          pathValue(pathTillRemapping, ogObj)
        )
          .filter(key => key !== ogKeyName)
          .concat([newKeyName])

        const updatedObj = endOfPathKeys.reduce(
          fillDeepKeyLevel(pathTillRemapping, ogObj, ogKeyName, newKeyName),
          remappedObj
        )

        remappedObj = cloneObj(updatedObj)
      } else {
        throw Error('Invalid parameters were supplied. A remap rule must be a none empty string or Array')
      }
    }

    function cleanOgKeys (key) {
      const isBlackListed = blacklist.includes(key)
      if (isBlackListed) {
        return
      }

      cleanObj[key] = ogObj[key]
    }

    const ogObjPrototype = Object.create(Object.getPrototypeOf(ogObj))
    const updatedObj = Object.assign(ogObjPrototype, cleanObj, remappedObj)

    return updatedObj
  }
}

function fillDeepKeyLevel (partialKeysPath, ogObj, ogKeyName, newKeyName) {
  return function (updatedObj, key) {
    const keysPath = [...partialKeysPath, key]
    const pathToValue = (function () {
      if (key === newKeyName) {
        return keysPath.filter(key => key !== newKeyName).concat([ogKeyName])
      }

      return keysPath
    })()
    const value = pathValue(pathToValue, ogObj)

    return pathAssign(value, keysPath, updatedObj)
  }
}
