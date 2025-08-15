import api from '../api'
import type { DepartamentoType } from '../../Types/types'

const editaDepartamento = async ({ id_departamento, nome, sigla }: DepartamentoType) => {
  const result = await api.put(`/departamentos/${id_departamento}`, {
    nome,
    sigla
  })
  return result
}

export default editaDepartamento
