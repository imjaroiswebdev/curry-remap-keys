# curry-remap-keys [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flt-square)](https://standardjs.com) [![NPM version](https://img.shields.io/npm/v/curry-remap-keys.svg?style=flat)](https://www.npmjs.com/package/curry-remap-keys) [![NPM monthly downloads](https://img.shields.io/npm/dm/curry-remap-keys.svg?style=flat)](https://npmjs.org/package/curry-remap-keys) [![NPM total downloads](https://img.shields.io/npm/dt/curry-remap-keys.svg?style=flat)](https://npmjs.org/package/curry-remap-keys)

> Utility for remapping key names of an object shallowly and depply nested too, that supports currying for partial application.

It embraces functional programming not mutating its entry, but returning a new object that even retains the original prototype respect referential transparency.

## Install

```shell
$ npm install curry-remap-keys --save
```

## Usage (Basic)

```javascript
const { remapKeys } = require('curry-remap-keys')
// As ES6 Module
import { remapKeys } from 'curry-remap-keys'

const user = {
  user_id: '9e947a10-af08-11e8-9b04-d3ce91a97e8d',
  order_id: 'aa4025d0-af08-11e8-9215-1106c9538c60',
  productName: 'The best notebook of the whole world',
  qty: '1'
}

const remapping = {
  user_id: 'userId',
  order_id: 'orderId'
}

const remappedUser = remapKeys(remapping, user)

console.log(remappedUser)
// {
//   userId: '9e947a10-af08-11e8-9b04-d3ce91a97e8d',
//   orderId: 'aa4025d0-af08-11e8-9215-1106c9538c60',
//   productName: 'The best notebook of the whole world',
//   qty: '1'
// }
```

<br>

## Usage (Nested keys)

> This will follow or create the necessary key names that fulfills the supplied path.

```javascript
const { remapKeys } = require('curry-remap-keys')
// As ES6 Module
import { remapKeys } from 'curry-remap-keys'

const user = {
  user_id: '9e947a10-af08-11e8-9b04-d3ce91a97e8d',
  order_id: 'aa4025d0-af08-11e8-9215-1106c9538c60',
  productName: 'The best notebook of the whole world',
  qty: '1',
  billingInfo: {
    locationInfo: {
      billing_address: '1368 Meadowbrook Mall Road',
      city: 'Los Angeles, CA',
      zip: '90017'
    }
  },
  customerInfo: {
    interested_in: ['notebooks', 'smartphones', 'smart tv'],
    isOneTimeBuyer: false
  }
}

const remapping = {
  user_id: 'userId',
  billing_address: ['billingAddress', ['billingInfo', 'locationInfo']],
  // Natural point notation for path to nested key also supported like...
  // billing_address: ['billingAddress', 'billingInfo.locationInfo'],
  interested_in: ['interestedIn', ['customerInfo']]
}

const remappedUser = remapKeys(remapping, user)

console.log(remappedUser)
// {
//   userId: '9e947a10-af08-11e8-9b04-d3ce91a97e8d',
//   order_id: 'aa4025d0-af08-11e8-9215-1106c9538c60',
//   productName: 'The best notebook of the whole world',
//   qty: '1',
//   billingInfo: {
//     locationInfo: {
//       billingAddress: '1368 Meadowbrook Mall Road',
//       city: 'Los Angeles, CA',
//       zip: '90017'
//     }
//   },
//   customerInfo: {
//     interestedIn: ['notebooks', 'smartphones', 'smart tv'],
//     isOneTimeBuyer: false
//   }
// }
```

<br>

## Currying

```javascript
const { remapKeys } = require('curry-remap-keys')
// As ES6 Module
import { remapKeys } from 'curry-remap-keys'

// Same user and remapping object as above

// Partially apply remapKeys for reusing
const userRemapper = remapKeys(remapping)

console.log(userRemapper(user))
// {
//   userId: '9e947a10-af08-11e8-9b04-d3ce91a97e8d',
//   orderId: 'aa4025d0-af08-11e8-9215-1106c9538c60',
//   productName: 'The best notebook of the whole world',
//   qty: '1'
// }
```

## License
Copyright © 2018, [José Antonio Reyes](https://imjaroiswebdev.tech).
Released under the [MIT License](LICENSE).
