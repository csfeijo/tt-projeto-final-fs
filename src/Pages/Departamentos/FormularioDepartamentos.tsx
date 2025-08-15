import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Message } from 'primereact/message';
import type { AxiosError } from "axios"
import Header from "../../Components/Header"
import insereDepartamento from "../../Services/Departamentos/insereDepartamento";
import dadosDepartamento from "../../Services/Departamentos/dadosDepartamento";
import editaDepartamento from "../../Services/Departamentos/editaDepartamento";

const FormularioDepartamentos = () => {
  const navigate = useNavigate()
  const { id_departamento } = useParams()

  const prefixoTitulo = id_departamento ? 'Edição' : 'Cadastro'
  const [nome, setNome] = useState<string>('')
  const [sigla, setSigla] = useState<string>('')
  const [erro, setErro] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  // Através do useRef conseguimos pegar a referencia do elemento e adicionar foco nele por exemplo
  const nomeRef = useRef<HTMLInputElement>(null)
  const siglaRef = useRef<HTMLInputElement>(null)

  const validaFormulario = () => {
    setErro('')

    if (nome === '') {
      setErro('Preencha o nome')
      nomeRef.current?.focus()

      return false
    }

    if (sigla === '') {
      setErro('Preencha a sigla')
      siglaRef.current?.focus()
      return false
    }

    return true
  }

  const cadastraDepartamento = async () => {
    try {
      await insereDepartamento({
        nome,
        sigla
      })
      // Direciona o usuário para a Listagem
      navigate('/departamentos')

    } catch (err: unknown) {
      const e = err as AxiosError<{message: string}> 
      setErro(e.response?.data?.message || 'Erro interno')
    }
    setLoading(false)
  }

  // Atualização de departamento
  const atualizaDepartamento = async () => {
    try {
      await editaDepartamento({
        id_departamento,
        nome,
        sigla
      })

      navigate('/departamentos')
   } catch (err: unknown) {
      const e = err as AxiosError<{message: string}> 
      setErro(e.response?.data?.message || 'Erro interno')
    }
  }

  useEffect(() => {
    if (id_departamento) {
      const infoDepartamento = async () => {
        try {
          const { data } = await dadosDepartamento(id_departamento)
          setNome(data[0].nome)
          setSigla(data[0].sigla)
        } catch (err) {
          console.log(err)
          setErro('Erro interno')
        }
      }

      infoDepartamento()
    }
  }, [id_departamento])

  return (
    <>
      <Header 
        botaoIcone="pi-chevron-left" 
        botaoUrl="/departamentos" 
        titulo={`${prefixoTitulo} de Departamento`}
      />
      
      <div className="flex gap-4 mb-6">
        {/* Primeira coluna */}
        <div className="flex flex-col gap-2 w-1/3">
          <label htmlFor="nome">Nome</label>
          <InputText
            id="nome"
            autoComplete="off"
            value={nome}
            onChange={(evt) => {
              setNome(evt.currentTarget.value)
            }}
            ref={nomeRef}
          />
        </div>
        {/*  Segunda coluna */}
        <div className="flex flex-col gap-2 w-1/4">
          <label htmlFor="nome">Sigla</label>
          <InputText
            id="sigla"
            autoComplete="off"
            value={sigla}
            onChange={(evt) => {
              setSigla(evt.currentTarget.value)
            }}
            ref={siglaRef}
          />
        </div>
        {/* Terceira coluna */}
        <div className="flex gap-2 items-end">
          <Button
            icon="pi pi-save"
            label="Salvar"
            severity="warning"
            onClick={() => {
              if (validaFormulario()) {
                setLoading(true)
                if (!id_departamento) {
                  cadastraDepartamento()
                } else {
                  atualizaDepartamento()
                }
              }
            }}
            loading={loading}
          />
        </div>
      </div>
      <Message text={erro} severity="error" hidden={erro === ''}/>
    </>
  )
}

export default FormularioDepartamentos