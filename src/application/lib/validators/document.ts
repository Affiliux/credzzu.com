import { validateCNPJ } from './cnpj'
import { validateCPF } from './cpf'

/**
 * @name validateDocument
 * @category Application - Lib - Validators
 *
 * @param  {string} value - value to validate
 * @param  {string} type - type of document
 * @return boolean
 */

export function validateDocument(value: string, type: 'CPF' | 'CNPJ'): boolean {
  const cleaned = value.replace(/\D/g, '')
  if (type === 'CPF') {
    return validateCPF(cleaned)
  }
  return validateCNPJ(cleaned)
}
