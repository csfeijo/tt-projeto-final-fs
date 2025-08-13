import api from '../api'
import type { DepartamentoType } from '../../Types/types'

// Usando o Omit para não ter erro de obrigatoriedade do id_departamento
export type NovoDepartamentoType = Omit<DepartamentoType, 'id_departamento'>


const insereDepartamento = async ({ nome, sigla }: NovoDepartamentoType) => {
  const result = await api.post('/departamentos', {
    nome,
    sigla
  })
  return result
}

export default insereDepartamento
