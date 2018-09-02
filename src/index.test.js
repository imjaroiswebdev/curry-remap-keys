import { remapKeys } from '.'

test('Presents the Library description', () => (
  expect(remapKeys()).toBe('Library for remapping a Javascript object keys names (shallowly) that supports currying.')
))
