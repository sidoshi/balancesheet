const inrFmt = (n: number): string => {
  const [int, fr] = n.toString().split('.')
  const num = []
  let cursor = 0

  for (let i = int.length - 1; i >= 0; i -= 1) {
    cursor += 1
    num.push(int[i])

    if (cursor !== 1 && cursor % 2 !== 0 && i !== 0) {
      num.push(',')
    }
  }

  const str = num.reverse().join('')
  return fr ? [str, fr].join('.') : str
}

export default inrFmt
