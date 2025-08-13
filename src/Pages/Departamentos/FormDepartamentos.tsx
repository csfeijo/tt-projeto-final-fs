import { useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import Header from '../../Components/Header'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Message } from 'primereact/message'
import insereDepartamento from '../../Services/Departamentos/insereDepartamento'

const FormDepartamentos = () => {
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [sigla, setSigla] = useState('')
  const [erroForm, setErroForm] = useState('')
  
  // Para adicionar o foco nos elementos
  const nomeRef = useRef<HTMLInputElement>(null)
  const siglaRef = useRef<HTMLInputElement>(null)

  const validaFormulario = () => {
    setErroForm('')

    if (nome === '') {
      setErroForm('Nome deve ser preenchido')
      nomeRef.current?.focus()

      return false
    }
    if (sigla === '') {
      setErroForm('Sigla deve ser preenchida')
      siglaRef.current?.focus()

      return false
    }
    return true
  }

  const cadastraDepartamento = async () => {
    try{
      await insereDepartamento({
        nome,
        sigla
      })

      navigate('/departamentos')
    } catch (e) {
      console.log(e)
      setErroForm('Erro na criação do Departamento')
    }
  }

  return (
    <>
      <Header 
        titulo="Cadastro de Departamento" 
        icon="pi-chevron-left" 
        botaoTitulo='Voltar'
        botaoUrl="/departamentos"
      />

      <div className='flex gap-4 mb-6'>
        <div className="flex flex-col gap-2 w-1/3">
          <label htmlFor="nome">Nome</label>
          <InputText 
            id="nome"
            autoComplete="off"
            value={nome}
            ref={nomeRef}
            onChange={(e) => {
              setNome(e.currentTarget.value)
            }}
          />
        </div>
        <div className="flex flex-col gap-2 w-1/4">
          <label htmlFor="sigla">Sigla</label>
          <InputText 
            id="sigla"
            autoComplete='off'
            value={sigla}
            ref={siglaRef}
            onChange={(e) => {
              setSigla(e.currentTarget.value)
            }}
          />
        </div>
        <div className='items-end flex'>
          <Button
            severity='warning' 
            label='Salvar'
            icon="pi pi-save"
            onClick={async () => {
              if (validaFormulario()) {
                cadastraDepartamento()
              }
            }}
          />
        </div>
      </div>
      <Message text={erroForm} severity='error' hidden={erroForm === ''} />
    </>
  )
}

export default FormDepartamentos
