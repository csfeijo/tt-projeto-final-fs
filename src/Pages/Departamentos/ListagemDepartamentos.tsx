import { useNavigate } from 'react-router';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import Header from "../../Components/Header"

const ListagemDepartamentos = () => {

  const navigate = useNavigate()

  interface Departamento  {
    id_departamento: number,
    sigla: string,
    nome: string
  }

  // Dado simulado - mock
  const departamentos: Departamento[] = [
    {
      id_departamento: 1,
      sigla: 'DP',
      nome: 'Departamento Pessoal'
    },
    {
      id_departamento: 2,
      sigla: 'RH',
      nome: 'Recursos Humanos'
    },
    {
      id_departamento: 3,
      sigla: 'TI',
      nome: 'Tecnologia da Informação'
    },
    {
      id_departamento: 4,
      sigla: 'DF',
      nome: 'Departamento Financeiro'
    },
    {
      id_departamento: 5,
      sigla: 'ENGSW',
      nome: 'Engenharia de Software'
    },
  ]

  // Template de ações
  const templateAcoes = (departamento: Departamento) => {
    return (
      <div className='flex justify-between'>
        <Button 
          icon='pi pi-pencil'
          severity='info'
          rounded 
          text
          raised
          onClick={() => {
            navigate(`/departamentos/edit/${departamento.id_departamento}`);
          }}
        />
        <Button 
          icon='pi pi-trash'
          severity='danger'
          rounded 
          text
          raised
          onClick={() => {
            alert(`EXCLUIRÁ o departamento: ${departamento.nome} `);
          }}
        />
      </div>
    )
  }

  return (
    <>

      <Header botaoIcone='pi-plus' botaoUrl='/departamentos/new' titulo='Listagem de Departamentos' />


      <DataTable value={departamentos} showGridlines stripedRows paginator rows={3} className='table-fixed w-full'>
        <Column headerClassName="w-[8%]" bodyClassName="w-[8%]" field="id_departamento" header="ID" />
        <Column headerClassName="w-[50%]" bodyClassName="w-[50%]"field="nome" header="Nome" />
        <Column headerClassName="w-[25%]" bodyClassName="w-[25%]"field="sigla" header="Sigla" />
        <Column headerClassName="w-[12%]" bodyClassName="w-[12%]"header="Ação" body={templateAcoes} />
      </DataTable>
    </>
  )
}

export default ListagemDepartamentos