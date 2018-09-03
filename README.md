# curry-remap-keys [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flt-square)](https://standardjs.com)

> Library for remapping a Javascript object keys names (shallowly) that supports currying for partial application.

## Install

```shell
$ npm install curry-remap-keys --save
```

## Usage

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

## Currying

```javascript
const { remapKeys } = require('curry-remap-keys')
// As ES6 Module
import { remapKeys } from 'curry-remap-keys'

// Same user and remapping object as above

const userRemapper = rempKeys(remapping)

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
