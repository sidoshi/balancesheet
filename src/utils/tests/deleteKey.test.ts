import deleteKey from '../deleteKey'

test('immutably deletes key from given object', () => {
  const obj = {
    x: 5,
    y: 6,
  }
  const deleted = deleteKey(obj, 'x')
  expect(deleted).not.toBe(obj)
  expect(deleted).not.toHaveProperty('x')
  expect(obj).toHaveProperty('x')
})
