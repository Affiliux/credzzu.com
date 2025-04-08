/**
 * @name phoneMask
 * @category Application - Lib - Masks
 *
 * @param  {string} value - value to formated
 * @return string
 */

export function phoneMask(value: string) {
  const numbers = value.replace(/\D/g, '')
  const limitedNumbers = numbers.slice(0, 11)

  if (limitedNumbers.length <= 2) {
    return limitedNumbers.length ? `(${limitedNumbers}` : ''
  } else if (limitedNumbers.length <= 6) {
    return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2)}`
  } else {
    return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 7)}-${limitedNumbers.slice(7)}`
  }
}
