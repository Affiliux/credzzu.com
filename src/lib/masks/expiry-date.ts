/**
 * @name expiryDateMask
 * @category Lib - Masks
 *
 * @param  {string} value - value to format
 * @return {string}
 */

export function expiryDateMask(value: string): string {
  const numbers = value.replace(/\D/g, '')
  const limitedNumbers = numbers.slice(0, 4)

  // Format as MM/YY
  if (limitedNumbers.length <= 2) {
    return limitedNumbers
  } else {
    // Make sure month is not greater than 12
    let month = limitedNumbers.slice(0, 2)
    if (parseInt(month) > 12) {
      month = '12'
    }

    return `${month}/${limitedNumbers.slice(2)}`
  }
}
