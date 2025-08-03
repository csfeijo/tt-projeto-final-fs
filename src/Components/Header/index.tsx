import { Button } from 'primereact/button'
import { useNavigate } from 'react-router'

type Header = {
  titulo: string,
  botaoUrl: string,
  botaoTitulo?: string,
  icon: string,
}

const Header = ({ titulo, botaoUrl, icon, botaoTitulo }: Header) => {
  const navigate = useNavigate()

  return (
    <div className="flex justify-between items-center py-4">
      <h1 className="text-2xl">{titulo}</h1>
      <Button 
        severity='secondary' 
        icon={`pi ${icon}`} 
        text 
        raised 
        rounded 
        label={botaoTitulo}
        onClick={() => {
          navigate(botaoUrl)
        }}
      />
    </div>
  )
}

export default Header
