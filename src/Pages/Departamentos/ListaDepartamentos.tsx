import { useEffect, useState, useTransition } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import listaDepartamentos from '../../Services/Departamentos/listaDepartamentos'
import { Message } from 'primereact/message'

type Departamento = {
  id_departamento: number,
  nome: string,
  sigla: string
}

const ListaDepartamentos = () => {
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
  
  return (
    <>
      <h1 className="text-2xl pb-4">Lista Departamentos</h1>
      <DataTable value={departamentos} showGridlines paginator rows={5} loading={!loaded} className="table-fixed w-full">
        <Column headerClassName="w-[8%]" bodyClassName="w-[8%]" field="id_departamento" header="ID"></Column>
        <Column headerClassName="w-[50%]" bodyClassName="w-[50%]" className="w-1/2" field="nome" header="Nome"></Column>
        <Column headerClassName="w-[25%]" bodyClassName="w-[25%]" className="w-1/4" field="sigla" header="Sigla"></Column>
        <Column headerClassName="w-[12%]" bodyClassName="w-[12%]" className="w-1/2" header="Ação"></Column>
      </DataTable>
      <Message hidden={!error} text={error} severity='error' className='w-full'/>
    </>
  )
}

export default ListaDepartamentos
