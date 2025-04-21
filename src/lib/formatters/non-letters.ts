/**
 * @name removeNonLetters
 * @category Lib - Formatters
 *
 * @param  {string} value - value to format
 * @return {string} - value without non-letters
 */

export function removeNonLetters(value: string): string {
  return value.replace(/[^a-zA-Z\s]/g, '')
}
