import { Button } from "primereact/button"
import { Badge } from 'primereact/badge';


function App() {
  return (
    <div className="p-10 bg-cyan-950 text-white">
      <h1>Projeto Final em React</h1>
      <h2 className="text-yellow-300">Consumindo uma API REST</h2>
      <hr/>
      <button className="
        px-4 
        py-2 
        bg-cyan-300 
        cursor-pointer
        rounded-xl 
        mt-4 
        text-cyan-950 
        border-2 
        hover:border-cyan-300
        hover:bg-cyan-950
        hover:text-white
      ">
        ENVIAR
      </button>
      
      <Button icon="pi pi-bell" rounded text raised>
        <Badge value={10} severity={"success"} size={"normal"}/>
      </Button>
    </div>
  )
}

export default App
