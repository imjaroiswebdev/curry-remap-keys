import { remapKeys } from '.'

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
