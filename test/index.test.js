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

  // expect(remapKeys(remapping, user)).toEqual(expected)
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
