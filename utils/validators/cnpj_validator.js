export const cnpjValidator = (cnpj) => {
  if (!cnpj) return false

  const numbers = matchNumbers(cnpj)

  if (numbers.length !== 14) return false

  const items = [...new Set(numbers)]
  if (items.length === 1) return false

  const digits = numbers.slice(12)

  const digit0 = validCalc(12, numbers)
  if (digit0 !== digits[0]) return false

  const digit1 = validCalc(13, numbers)
  return digit1 === digits[1]
}

const validCalc = (x, numbers) => {
  const slice = numbers.slice(0, x)
  let factor = x - 7
  let sum = 0

  for (let i = x; i >= 1; i--) {
    const n = slice[x - i]
    sum += n * factor--
    if (factor < 2) factor = 9
  }

  const result = 11 - (sum % 11)

  return result > 9 ? 0 : result
}

const matchNumbers = (value) => {
  const match = value.toString().match(/\d/g)
  return Array.isArray(match) ? match.map(Number) : []
}

export default cnpjValidator;