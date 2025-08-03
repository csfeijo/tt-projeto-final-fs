import { useEffect, useState, useTransition } from 'react'
import { useNavigate } from 'react-router'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Message } from 'primereact/message'
import { Button } from 'primereact/button'
import Header from '../../Components/Header'
import listaDepartamentos from '../../Services/Departamentos/listaDepartamentos'

type Departamento = {
  id_departamento: number,
  nome: string,
  sigla: string
}

const ListaDepartamentos = () => {
  const navigate = useNavigate()

  const [departamentos, setDepartamentos] = useState<Departamento[]>([])
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')

  // Fala do isPending, mas que não vai usa-lo
  const [, startTransition] = useTransition()

  useEffect(() => {
    if (loaded) return

    const loadDepartamentos = async () => {
      try {
        const { data } = await listaDepartamentos()

        // Aqui começa a transição
        startTransition(() => {
          setDepartamentos(data)
        })

        setLoaded(true)
      } catch (err) {
        console.error('Erro ao carregar departamentos:', err)
        setError('Erro ao carregar departamentos.')
      }
    }
    loadDepartamentos()
  }, [loaded])

  // Template dos botões de ação
  const templateAcoes = (departamento: Departamento) => {
    
    return (
      <div className='flex justify-between'>
        <Button icon="pi pi-pencil" rounded text raised severity="info" onClick={() => {
          navigate(`/departamentos/edit/${departamento.id_departamento}`)
        }}/>
        <Button icon="pi pi-trash" rounded text raised severity="danger" onClick={() => {
          alert(`Excluir departamento: ${departamento.nome}?`)
        }}/>
      </div>
    )
  }
  
  return (
    <>
      <Header botaoUrl='/departamentos/new' titulo="Listagem de Deptos" icon="pi-plus"/>
      <DataTable value={departamentos} showGridlines paginator rows={5} loading={!loaded} className="table-fixed w-full">
        <Column headerClassName="w-[8%]" bodyClassName="w-[8%]" field="id_departamento" header="ID"></Column>
        <Column headerClassName="w-[50%]" bodyClassName="w-[50%]" className="w-1/2" field="nome" header="Nome"></Column>
        <Column headerClassName="w-[25%]" bodyClassName="w-[25%]" className="w-1/4" field="sigla" header="Sigla"></Column>
        <Column headerClassName="w-[12%]" bodyClassName="w-[12%]" className="w-1/2" header="Ação" body={templateAcoes}></Column>
      </DataTable>
      <Message hidden={!error} text={error} severity='error' className='w-full'/>
    </>
  )
}

export default ListaDepartamentos
