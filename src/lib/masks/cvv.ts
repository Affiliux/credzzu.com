/**
 * @name cvvMask
 * @category Lib - Masks
 *
 * @param  {string} value - value to format
 * @return {string}
 */

export function cvvMask(value: string): string {
  const numbers = value.replace(/\D/g, '')
  // Most cards use 3 digits, but some like Amex use 4
  const limitedNumbers = numbers.slice(0, 4)

  return limitedNumbers
}
