/**
 * @name formatCurrency
 * @category Lib - Formatters - Currency
 *
 * @param  {number} value - value to format as currency
 * @return {string} - formatted value in BRL
 */

export function formatCurrency(value: number): string {
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}
