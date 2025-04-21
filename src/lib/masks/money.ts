/**
 * @name Money Mask
 * @category Lib - Masks
 *
 * @param {string} value - The value to be formatted
 * @returns {string} The formatted value in Brazilian currency
 */

export function moneyMask(value: string): string {
  // Remove all non-numeric characters
  const numericValue = value.replace(/\D/g, '')

  // Convert to number and divide by 100 to get the value in Brazilian currency
  const numberValue = Number(numericValue) / 100

  // Format the number to the Brazilian currency format
  return numberValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
