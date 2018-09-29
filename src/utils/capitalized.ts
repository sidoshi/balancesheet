import startCase from 'lodash/startCase'
import padEnd from 'lodash/padEnd'

export default (str: string) => {
  const capitalized = startCase(str.toLowerCase())
  return padEnd(capitalized, str.length)
}
