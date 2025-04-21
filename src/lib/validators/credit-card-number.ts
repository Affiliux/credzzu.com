/**
 * @name validateCreditCard
 * @category Lib - Validators
 *
 * @param  {string} value - value to validate
 * @return {boolean} - true if the credit card number is valid, false otherwise
 */

export function validateCreditCard(value: string): boolean {
  if (!value) return false

  // Remove all non digit characters
  const cardNumber = value.replace(/\D/g, '')
  if (cardNumber.length < 13 || cardNumber.length > 19) return false

  let sum = 0
  let shouldDouble = false

  // Loop from right to left
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i))

    if (shouldDouble) {
      digit *= 2
      if (digit > 9) digit -= 9
    }

    sum += digit
    shouldDouble = !shouldDouble
  }

  return sum % 10 === 0
}
