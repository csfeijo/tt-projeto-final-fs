import { useRef, useState } from "react"
import { useNavigate } from "react-router"
import Header from "../../Components/Header"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { Message } from 'primereact/message';
import insereDepartamento from "../../Services/Departamentos/insereDepartamento";
import type { AxiosError } from "axios"

const FormularioDepartamentos = () => {
  const navigate = useNavigate()
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

  return (
    <>
      <Header botaoIcone="pi-chevron-left" botaoUrl="/departamentos" titulo="Cadastro de Departamento" />
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
                cadastraDepartamento()
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