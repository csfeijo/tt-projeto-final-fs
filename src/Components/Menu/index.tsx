import { MegaMenu } from 'primereact/megamenu'

import items from './itemsMenu'

const Menu = () => {
  
  return (
    <div className="card">
      <MegaMenu model={items}  breakpoint="960px" />
    </div>
  )
}

export default Menu