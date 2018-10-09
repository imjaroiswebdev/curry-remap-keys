import { remapKeys } from '../src'

test('After remapping entry object (user) keys user_id and order_id to userId and orderId they must have the same values as they had in the original user object', () => {
  const user = {
    user_id: '9e947a10-af08-11e8-9b04-d3ce91a97e8d',
    order_id: 'aa4025d0-af08-11e8-9215-1106c9538c60'
  }

  const remapping = {
    user_id: 'userId',
    order_id: 'orderId'
  }

  const expected = {
    userId: '9e947a10-af08-11e8-9b04-d3ce91a97e8d',
    orderId: 'aa4025d0-af08-11e8-9215-1106c9538c60'
  }

  expect(remapKeys(remapping, user)).toEqual(expected)
})

test('The resulting remapped object must maintain its prototype chain and all its properties enumerables or not', () => {
  const user = Object.create(
    {
      inPrototypeChain: true
    },
    {
      inner_id: {
        value: '9e947a10-af08-11e8-9b04-d3ce91a97e8d',
        enumerable: false,
        configurable: true,
        writable: true
      },
      user_id: {
        value: '9e947a10-af08-11e8-9b04-d3ce91a97e8d',
        enumerable: true,
        configurable: true,
        writable: true
      },
      order_id: {
        value: 'aa4025d0-af08-11e8-9215-1106c9538c60',
        enumerable: true,
        configurable: true,
        writable: true
      }
    }
  )

  const remapping = {
    user_id: 'userId',
    order_id: 'orderId'
  }

  const expected = Object.create({},
    {
      inner_id: {
        value: '9e947a10-af08-11e8-9b04-d3ce91a97e8d',
        enumerable: false,
        configurable: true,
        writable: true
      },
      userId: {
        value: '9e947a10-af08-11e8-9b04-d3ce91a97e8d',
        enumerable: true,
        configurable: true,
        writable: true
      },
      orderId: {
        value: 'aa4025d0-af08-11e8-9215-1106c9538c60',
        enumerable: true,
        configurable: true,
        writable: true
      }
    }
  )
  const expectedPrototype = Object.getPrototypeOf(user)
  const expectedPropertyDescriptor = Object.getOwnPropertyDescriptors(expected)

  const result = remapKeys(remapping, user)
  const resultingPrototype = Object.getPrototypeOf(result)
  const resultingPropertyDescriptors = Object.getOwnPropertyDescriptors(result)

  expect(result).toEqual(expected)
  expect(resultingPrototype).toEqual(expectedPrototype)
  expect(resultingPropertyDescriptors).toEqual(expectedPropertyDescriptor)
})

test('After remapping the resulting object must maintain its keys not being remapped ontouched', () => {
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

  const expected = {
    userId: '9e947a10-af08-11e8-9b04-d3ce91a97e8d',
    orderId: 'aa4025d0-af08-11e8-9215-1106c9538c60',
    productName: 'The best notebook of the whole world',
    qty: '1'
  }

  expect(remapKeys(remapping, user)).toEqual(expected)
})

test('It must remap nested key names and the resulting object must maintain its keys not being remapped ontouched', () => {
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
    interested_in: ['interestedIn', ['customerInfo']]
  }

  const expected = {
    userId: '9e947a10-af08-11e8-9b04-d3ce91a97e8d',
    order_id: 'aa4025d0-af08-11e8-9215-1106c9538c60',
    productName: 'The best notebook of the whole world',
    qty: '1',
    billingInfo: {
      locationInfo: {
        billingAddress: '1368 Meadowbrook Mall Road',
        city: 'Los Angeles, CA',
        zip: '90017'
      }
    },
    customerInfo: {
      interestedIn: ['notebooks', 'smartphones', 'smart tv'],
      isOneTimeBuyer: false
    }
  }

  expect(remapKeys(remapping, user)).toEqual(expected)
})

test('It must remap nested key names with a path supplied as dot notation and the resulting object must maintain its keys not being remapped ontouched', () => {
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
    billing_address: ['billingAddress', 'billingInfo.locationInfo'],
    interested_in: ['interestedIn', ['customerInfo']]
  }

  const expected = {
    userId: '9e947a10-af08-11e8-9b04-d3ce91a97e8d',
    order_id: 'aa4025d0-af08-11e8-9215-1106c9538c60',
    productName: 'The best notebook of the whole world',
    qty: '1',
    billingInfo: {
      locationInfo: {
        billingAddress: '1368 Meadowbrook Mall Road',
        city: 'Los Angeles, CA',
        zip: '90017'
      }
    },
    customerInfo: {
      interestedIn: ['notebooks', 'smartphones', 'smart tv'],
      isOneTimeBuyer: false
    }
  }

  expect(remapKeys(remapping, user)).toEqual(expected)
})

test('If invalid deep remapping rule is supplied then it must throw an exception', () => {
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
    billing_address: ['billingAddress'],
    interested_in: ['interestedIn', ['customerInfo']]
  }

  const expected = {
    userId: '9e947a10-af08-11e8-9b04-d3ce91a97e8d',
    order_id: 'aa4025d0-af08-11e8-9215-1106c9538c60',
    productName: 'The best notebook of the whole world',
    qty: '1',
    billingInfo: {
      locationInfo: {
        billingAddress: '1368 Meadowbrook Mall Road',
        city: 'Los Angeles, CA',
        zip: '90017'
      }
    },
    customerInfo: {
      interestedIn: ['notebooks', 'smartphones', 'smart tv'],
      isOneTimeBuyer: false
    }
  }

  expect(() => {
    remapKeys(remapping, user)
  }).toThrow(/Invalid/)
})

test('If invalid parameters are supplied then it must throw an exception', () => {
  const user = {
    user_id: '9e947a10-af08-11e8-9b04-d3ce91a97e8d',
    order_id: 'aa4025d0-af08-11e8-9215-1106c9538c60',
    productName: 'The best notebook of the whole world',
    qty: '1'
  }

  const remapping = [
    'userId',
    'orderId'
  ]

  expect(() => {
    remapKeys(remapping, user)
  }).toThrow(/Invalid/)
})

test('It should be posible to partially apply the remapKeys function through currying', () => {
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

  const userRemapper = remapKeys(remapping)

  const expected = {
    userId: '9e947a10-af08-11e8-9b04-d3ce91a97e8d',
    orderId: 'aa4025d0-af08-11e8-9215-1106c9538c60',
    productName: 'The best notebook of the whole world',
    qty: '1'
  }

  expect(userRemapper(user)).toEqual(expected)
})
