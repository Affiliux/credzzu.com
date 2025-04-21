/**
 * @name validateExpiryDate
 * @category Lib - Validators
 *
 * @param  {string} value - value to validate
 * @return {boolean} - true if the expiry date is valid, false otherwise
 */

export function validateExpiryDate(value: string): boolean {
  const [month, year] = value.split('/').map(v => parseInt(v))
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear() % 100
  const currentMonth = currentDate.getMonth() + 1

  // Check if month is valid
  if (month < 1 || month > 12) return false

  // Check if date is in the past
  if (year < currentYear || (year === currentYear && month < currentMonth)) return false

  return true
}
