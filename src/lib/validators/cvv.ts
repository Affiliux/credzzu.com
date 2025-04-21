/**
 * @name validateCVV
 * @category Lib - Validators
 *
 * @param  {string} value - value to validate
 * @return {boolean} - true if the CVV is valid, false otherwise
 */

export function validateCVV(value: string): boolean {
  const cvv = value.replace(/\D/g, '')
  return cvv.length >= 3 && cvv.length <= 4
}
