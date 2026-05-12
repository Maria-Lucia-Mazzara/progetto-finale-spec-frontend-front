import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar";
import ProdottiPage from "./pages/ProdottiPage";
import DettaglioProdotto from "./pages/DettaglioProdotto";
import { PreferitiProvider } from "./context/PreferitiContext";
// Importazione del Context globale per la funzione prodotti preferiti
import PreferitiPage from "./pages/PreferitiPage";
import { ComparatoreProvider } from "./context/ComparatoreContext";
// Importazione del Context globale per la funzione del confronta prodotti
import ComparatorePage from "./pages/ComparatorePage";

function App() {


  return (
    <PreferitiProvider>
      <ComparatoreProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/prodotti" element={<ProdottiPage />} />
            <Route path="/prodotti/:id" element={<DettaglioProdotto />} />
            <Route path="/preferiti" element={<PreferitiPage />} />
            <Route path="/comparatore" element={<ComparatorePage />} />
          </Routes>
        </BrowserRouter>
      </ComparatoreProvider>
    </PreferitiProvider>

  )
}

export default App