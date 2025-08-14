import api from "../api"
import type { Departamento } from "../../Types/types"

export type InsereDepartamentoType = Omit<Departamento, 'id_departamento'>

const insereDepartamento = async ({ nome, sigla }: InsereDepartamentoType) => {
  const result = await api.post('/departamentos', {
    nome,
    sigla
  })

  return result
}

export default insereDepartamento