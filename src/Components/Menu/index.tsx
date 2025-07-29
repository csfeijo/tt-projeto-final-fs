import { Menubar } from 'primereact/menubar'
import items from './itemsMenu'

const Menu = () => {
  
  return (
    <>
      <Menubar model={items}/>
    </>
  )
}

export default Menu