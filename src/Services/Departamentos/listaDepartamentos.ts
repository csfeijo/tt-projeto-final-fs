import api from "../api";

const listaDepartamentos = async () => {
  const result = await api.get('/departamentos');
  return result
}

export default listaDepartamentos;