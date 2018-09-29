import inrFmt from '../inrFmt'

test('formats numbers in inr style', () => {
  expect(inrFmt(100)).toBe('100')
  expect(inrFmt(1000)).toBe('1,000')
  expect(inrFmt(10000)).toBe('10,000')
  expect(inrFmt(100000)).toBe('1,00,000')
  expect(inrFmt(1000000)).toBe('10,00,000')
  expect(inrFmt(93000)).toBe('93,000')
  expect(inrFmt(23.222)).toBe('23.222')
  expect(inrFmt(233.222)).toBe('233.222')
  expect(inrFmt(2333.222)).toBe('2,333.222')
  expect(inrFmt(-67000)).toBe('-67,000')
})
