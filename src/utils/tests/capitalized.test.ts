import capitalized from '../capitalized'

test('formats numbers in inr style', () => {
  expect(capitalized('foo')).toBe('Foo')
  expect(capitalized('foo bar')).toBe('Foo Bar')
  expect(capitalized('foo bar baz   ')).toBe('Foo Bar Baz   ')
})
