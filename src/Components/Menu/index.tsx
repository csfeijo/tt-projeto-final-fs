import { MegaMenu } from "primereact/megamenu"
import menuItems from "./menuItems"

const Menu = () => {

  return (
    <>
    <MegaMenu model={menuItems()} breakpoint="960px"/>
    </>
  )
}

export default Menu