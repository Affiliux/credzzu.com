/**
 * @name removeNonNumbers
 * @category Lib - Formatters
 *
 * @param  {string} value - value to format
 * @return {string} - value without non-numbers
 */

export function removeNonNumbers(value: string): string {
  return value.replace(/\D/g, '')
}
