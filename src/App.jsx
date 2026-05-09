import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar";
import ProdottiPage from "./pages/ProdottiPage";
import DettaglioProdotto from "./pages/DettaglioProdotto";
import { PreferitiProvider } from "./context/PreferitiContext";
import PreferitiPage from "./pages/PreferitiPage";

function App() {


  return (
    <PreferitiProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/prodotti" element={<ProdottiPage />} />
          <Route path="/prodotti/:id" element={<DettaglioProdotto />} />
          <Route path="/preferiti" element={<PreferitiPage />} />
        </Routes>
      </BrowserRouter>
    </PreferitiProvider>

  )
}

export default App