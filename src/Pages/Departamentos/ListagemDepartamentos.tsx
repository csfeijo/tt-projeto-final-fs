import { useState, useEffect, useTransition } from 'react';
import { useNavigate } from 'react-router';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import type { Departamento } from '../../Types/types';
import Header from "../../Components/Header";
import listaDepartamentos from '../../Services/Departamentos/listaDepartamentos';
import excluiDepartamento from '../../Services/Departamentos/excluiDepartamento';
import type { AxiosError } from 'axios';


const ListagemDepartamentos = () => {
  // Uso de HOOKS
  const navigate = useNavigate()
  const [departamentos, setDepartamentos] = useState<Departamento[]>([])
  const [, startTransition] = useTransition()
  const [loaded, setLoaded] = useState<boolean>(false)
  const [erro, setErro] = useState<string>('')
  const [erroExclusao, setErroExclusao] = useState<string>('')

  useEffect(() => {
    // testa se o dado ja foi carregado
    if (loaded) return;

    const loadDepartamentos = async () => {
      try {
        const { data } = await listaDepartamentos();
        
        startTransition( () => {
          setDepartamentos(data)
        })       

        setLoaded(true)
      } catch(e) {
        console.log(e);
        setErro('Erro interno na carga de Departamentos')
      }
    }
    loadDepartamentos()
  },[loaded])
  
  // Chamada de API para exclusão do registro
  const removeDepartamento = async(id_departamento: number) => {
    try {
      await excluiDepartamento(id_departamento)
      setLoaded(false)
    } catch (err: unknown) {
      const e = err as AxiosError<{message: string}> 
      setErroExclusao(e.response?.data?.message || 'Erro interno')
    }
  }

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
            removeDepartamento(departamento.id_departamento)
          }}
        />
      </div>
    )
  }

  return (
    <>

      <Header botaoIcone='pi-plus' botaoUrl='/departamentos/new' titulo='Listagem de Departamentos' />

      <DataTable 
        value={departamentos} 
        showGridlines 
        stripedRows 
        paginator 
        rows={3}
        className='table-fixed w-full mb-8'
        loading={!loaded}
        hidden={erro !== ''}
      >
        <Column headerClassName="w-[8%]" bodyClassName="w-[8%]" field="id_departamento" header="ID" />
        <Column headerClassName="w-[50%]" bodyClassName="w-[50%]"field="nome" header="Nome" />
        <Column headerClassName="w-[25%]" bodyClassName="w-[25%]"field="sigla" header="Sigla" />
        <Column headerClassName="w-[12%]" bodyClassName="w-[12%]"header="Ação" body={templateAcoes} />
      </DataTable>

      <Message text={erro} hidden={erro === ''} className='w-full' severity='warn'/>
      
      <Message text={erroExclusao} hidden={erroExclusao === ''} className='w-full' severity='error'/>
    </>
  )
}

export default ListagemDepartamentos