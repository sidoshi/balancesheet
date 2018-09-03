import toFixed from '../toFixed'

test('always returns a number', () => {
  expect(toFixed(100.97, 3)).toEqual(100.97)
})

test('returns int when possible', () => {
  expect(toFixed(100.0, 10)).toEqual(100)
})
