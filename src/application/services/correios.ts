export interface State {
  id: string
  sigla: string
  nome: string
}

export interface City {
  id: string
  nome: string
}

export async function getStates(): Promise<State[]> {
  const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
  const data = await response.json()
  return data.map((state: any) => ({
    id: state.id,
    sigla: state.sigla,
    nome: state.nome,
  }))
}

export async function getCitiesByState(stateId: string): Promise<City[]> {
  const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`)
  const data = await response.json()
  return data.map((city: any) => ({
    id: city.id,
    nome: city.nome,
  }))
}
