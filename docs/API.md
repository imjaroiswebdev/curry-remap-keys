<a name="module_curry-remap-keys"></a>

# curry-remap-keys
**Example**  
```js
const { remapKeys } = require('curry-remap-keys')
// As ES6 Module
import { remapKeys } from 'curry-remap-keys'
```
<a name="module_curry-remap-keys.remapKeys"></a>

## curry-remap-keys.remapKeys(mapping, ogObj) ⇒ <code>object</code> \| <code>function</code>
Remaps (rename) the property keys of an object based on a mapping
configuration supplied.

**Kind**: static method of [<code>curry-remap-keys</code>](#module_curry-remap-keys)  
**Returns**: <code>object</code> \| <code>function</code> - New object with remapped key(s) or a curried
function configured for remap the keys of its entry. This object maintains the
prototype of the original object supplied or if only a mapping configuration
its supplied then a function expecting an object for being
remapped would be returned.  

| Param | Type | Description |
| --- | --- | --- |
| mapping | <code>object</code> | Object that defines the remapping of the supplied object property keys. |
| ogObj | <code>object</code> | Original object that will be receiving a remap (rename) of one or more of its keys. |

**Example**  
```js
// Simple remap rule - Will rename a key at the root level of the object
const mapping = { originalKeyName: 'newKeyName' }

// Deep remap rule - Will rename a deeply nested key of the object
const mapping = { originalKeyName: ['newKeyName', 'path.to.key'] }
```
