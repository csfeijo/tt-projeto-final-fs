import { useState } from 'react'
import Header from '../../Components/Header'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Message } from 'primereact/message'

const FormDepartamentos = () => {
  const [nome, setNome] = useState('')
  const [sigla, setSigla] = useState('')
  const [erroNome, setErroNome] = useState('')
  const [erroSigla, setErroSigla] = useState('')

  const validaFormulario = () => {
    setErroNome('')
    setErroSigla('')

    if (nome === '') {
      setErroNome('Nome deve ser preenchido')
      return false
    }
    if (sigla === '') {
      setErroSigla('Sigla deve ser preenchida')
      return false
    }
    return true
  }

  return (
    <>
      <Header 
        titulo="Cadastro de Departamento" 
        icon="pi-chevron-left" 
        botaoTitulo='Voltar'
        botaoUrl="/departamentos"
      />

      <div className='flex gap-4'>
        <div className="flex flex-col gap-2 w-1/3">
          <label htmlFor="nome">Nome</label>
          <InputText 
            id="nome"
            autoComplete="off"
            value={nome}
            onChange={(e) => {
              setNome(e.currentTarget.value)
            }}
            invalid={erroNome !== ''}
          />
        </div>
        <div className="flex flex-col gap-2 w-1/4">
          <label htmlFor="sigla">Sigla</label>
          <InputText 
            id="sigla"
            autoComplete='off'
            value={sigla}
            onChange={(e) => {
              setSigla(e.currentTarget.value)
            }}
            invalid={erroSigla !== ''}
          />
        </div>
        <div className='items-end flex'>
          <Button
            severity='warning' 
            label='Salvar'
            icon="pi pi-save"
            onClick={() => {
              if (validaFormulario()) {
                alert('Foi')
              }
            }}
          />
        </div>
      </div>
      <Message hidden={erroNome === '' || erroSigla === ''} text={erroNome} severity='error' className='w-full'/>

    </>
  )
}

export default FormDepartamentos
