/**
 * @name phoneMask
 * @category Lib - Masks
 *
 * @param  {string} value - value to formated
 * @return {string}
 */

export function phoneMask(value: string): string {
  const cleaned = value.replace(/\D/g, '')

  if (cleaned.length <= 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }

  return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
}
