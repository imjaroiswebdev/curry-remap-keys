/**
 * Primitive JSON-like values that can be remapped.
 * @typedef {string | number | boolean | symbol | bigint | null | undefined} Primitive
 */

/**
 * @typedef {Primitive | RemappableObject | RemappableValue[]} RemappableValue
 */

/**
 * @typedef {Record<string, RemappableValue>} RemappableObject
 */

/**
 * A dot-notation string or array describing a nested path.
 * @typedef {string | string[]} NestedPath
 */

/**
 * Tuple describing the new key name and the original path.
 * @typedef {[string, NestedPath]} DeepRemapRule
 */

/**
 * Supported rule for renaming keys.
 * @typedef {string | DeepRemapRule} RemapRule
 */

/**
 * Mapping configuration keyed by the original property names.
 * @template {RemappableObject} TObject
 * @template {RemappableObject} [TResult=TObject]
 * @typedef {Record<string, RemapRule> & Partial<Record<keyof TObject, RemapRule>>} RemapMapping
 */

/**
 * Curried remapper returned when only a mapping configuration is supplied.
 * @template {RemappableObject} TInput
 * @template {RemappableObject} TOutput
 * @typedef {(ogObj: TInput) => TOutput} CurriedRemapper
 */

export {}
