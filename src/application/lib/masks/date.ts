export function dateMask(value: string): string {
  // Remove todos os caracteres não numéricos
  const numericValue = value.replace(/\D/g, '')

  // Limita o tamanho máximo a 8 dígitos (DDMMYYYY)
  const limitedValue = numericValue.slice(0, 8)

  // Adiciona as barras na posição correta
  if (limitedValue.length <= 2) {
    return limitedValue
  } else if (limitedValue.length <= 4) {
    return `${limitedValue.slice(0, 2)}/${limitedValue.slice(2)}`
  } else {
    return `${limitedValue.slice(0, 2)}/${limitedValue.slice(2, 4)}/${limitedValue.slice(4)}`
  }
}
