import { useNavigate } from 'react-router'
import { MegaMenu } from 'primereact/megamenu'
import menuItems from './menuItems'

const Menu = () => {
  const navigate = useNavigate()

  return (
    <div className="card">
      <MegaMenu model={menuItems(navigate)}  breakpoint="960px" />
    </div>
  )
}

export default Menu
