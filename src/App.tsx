import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./Pages/Home";
import ListaDepartamentos from "./Pages/Departamentos/ListaDepartamentos";
import FormDepartamentos from "./Pages/Departamentos/FormDepartamentos";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      <Route path="departamentos">
        <Route index element={<ListaDepartamentos />} />
        <Route path="new" element={<FormDepartamentos />} />
      </Route>
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
