export function moneyMask(value: string): string {
  // Remove todos os caracteres não numéricos
  const numericValue = value.replace(/\D/g, '')

  // Converte para número e divide por 100 para obter o valor em reais
  const numberValue = Number(numericValue) / 100

  // Formata o número para o formato brasileiro de moeda
  return numberValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
