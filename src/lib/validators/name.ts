/**
 * @name validateName
 * @category Lib - Validators
 *
 * @param  {string} value - value to validate
 * @return {boolean} - true if the name is valid, false otherwise
 */

export function validateName(value: string): boolean {
  return value.trim().length >= 3 && /^[a-zA-Z\s]+$/.test(value)
}
