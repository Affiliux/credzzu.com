import { validateCNPJ } from './cnpj'
import { validateCPF } from './cpf'

/**
 * @name validateDocument
 * @category Lib - Validators
 *
 * @param  {string} value - value to validate
 * @param  {string} type - type of document
 * @return {boolean} - true if the document is valid, false otherwise
 */

export function validateDocument(value: string, type: 'CPF' | 'CNPJ'): boolean {
  const cleaned = value.replace(/\D/g, '')
  if (type === 'CPF') {
    return validateCPF(cleaned)
  }
  return validateCNPJ(cleaned)
}
