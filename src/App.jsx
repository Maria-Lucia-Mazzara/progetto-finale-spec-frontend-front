import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar";
import ProdottiPage from "./pages/ProdottiPage";
import DettaglioProdotto from "./pages/DettaglioProdotto";

function App() {


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/prodotti" element={<ProdottiPage />} />
        <Route path="/prodotti/:id" element={<DettaglioProdotto />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App