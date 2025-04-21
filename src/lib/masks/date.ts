/**
 * @name dateMask
 * @category Lib - Masks
 *
 * @param {string} value - The value to be formatted
 * @returns {string} The formatted value in DD/MM/YYYY format
 */

export function dateMask(value: string): string {
  // Remove all non-numeric characters
  const numericValue = value.replace(/\D/g, '')

  // Limit the maximum length to 8 digits (DDMMYYYY)
  const limitedValue = numericValue.slice(0, 8)

  // Add the correct bars in the correct position
  if (limitedValue.length <= 2) {
    return limitedValue
  } else if (limitedValue.length <= 4) {
    return `${limitedValue.slice(0, 2)}/${limitedValue.slice(2)}`
  } else {
    return `${limitedValue.slice(0, 2)}/${limitedValue.slice(2, 4)}/${limitedValue.slice(4)}`
  }
}
