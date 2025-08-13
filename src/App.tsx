import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './Pages/Home'
import ListagemDepartamentos from './Pages/Departamentos/ListagemDepartamentos'
import FormDepartamentos from './Pages/Departamentos/FormDepartamentos'
import Menu from './Components/Menu'

const App = () => {
  return (
    <BrowserRouter>
      <Menu/>
      <div className="container mx-auto max-w-7xl px-4 py-4">
        <Routes>
          <Route index element={<Home />} />
          <Route path="departamentos">
            <Route index element={<ListagemDepartamentos />} />
            <Route path="new" element={<FormDepartamentos />} />
            <Route path="edit/:id_departamento" element={<FormDepartamentos />} />
          </Route>
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
