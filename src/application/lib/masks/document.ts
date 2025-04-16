/**
 * @name documentMask
 * @category Application - Lib - Masks
 *
 * @param  {string} value - value to formated
 * @param  {string} type - type of document
 * @return string
 */

export function documentMask(value: string, type: 'CPF' | 'CNPJ'): string {
  const cleaned = value.replace(/\D/g, '')

  if (type === 'CPF') {
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}
