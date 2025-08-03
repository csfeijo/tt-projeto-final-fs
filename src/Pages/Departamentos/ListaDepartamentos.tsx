import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

const ListaDepartamentos = () => {
  const departamentos = [
    {
      id_departamento: 1,
      nome: 'Financeiro',
      sigla: 'Financ'
    },
    {
      id_departamento: 2,
      nome: 'Recursos Humanos',
      sigla: 'RH'
    },
  ]
  return (
    <>
      <h1 className="text-2xl pb-4">Lista Departamentos</h1>

      <DataTable value={departamentos} showGridlines paginator rows={1}>
        <Column className="w-14" field="id_departamento" header="ID"></Column>
        <Column className="w-1/2" field="nome" header="Nome"></Column>
        <Column className="w-1/4" field="sigla" header="Sigla"></Column>
        <Column header="Ação"></Column>
      </DataTable>
    </>
  )
}

export default ListaDepartamentos