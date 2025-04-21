/**
 * @name creditCardMask
 * @category Lib - Masks
 *
 * @param  {string} value - value to format
 * @return {string}
 */

export function creditCardMask(value: string): string {
  const numbers = value.replace(/\D/g, '')
  const limitedNumbers = numbers.slice(0, 16)

  // Format as 0000 0000 0000 0000
  let formattedValue = ''

  for (let i = 0; i < limitedNumbers.length; i++) {
    if (i > 0 && i % 4 === 0) {
      formattedValue += ' '
    }
    formattedValue += limitedNumbers[i]
  }

  return formattedValue
}
