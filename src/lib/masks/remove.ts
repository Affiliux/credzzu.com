/**
 * @name removeMask
 * @category Lib - Masks
 *
 * @param  {string} value - value to format
 * @return {string}
 */

export function removeMask(value: string): string {
  return value.replace(/\D/g, '')
}
