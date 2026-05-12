import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import imgNonTrovato from "../assets/non_trovato/non_trovato.png";

export default function ProdottiPage() {
    const [makeupList, setMakeupList] = useState([]);


    const [searchParams] = useSearchParams();
    const parolaCercata = searchParams.get("search") || "";
    const [categoriaSelezionata, setCategoriaSelezionata] = useState("");
    const [ordineAlfabetico, setOrdineAlfabetico] = useState("");

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL)
            .then(res => res.json())
            .then(data => setMakeupList(data))
            .catch(error => console.error("Errore API:", error));
    }, []);


    const categorieUniche = useMemo(() => {
        const categories = makeupList.map(item => item.category).filter(Boolean);
        // Uso Set per eliminare i doppioni dall'array
        return [...new Set(categories)];
    }, [makeupList]);


    const prodottiFiltrati = useMemo(() => {
        let risultato = makeupList.filter((prodotto) => {
            const nomeProdotto = prodotto.title.toLowerCase();
            const categoriaProdotto = (prodotto.category || "").toLowerCase();
            const ricerca = parolaCercata.toLowerCase();


            const matchaRicerca = nomeProdotto.includes(ricerca) || categoriaProdotto.includes(ricerca);
            const matchaCategoria = categoriaSelezionata === "" || prodotto.category === categoriaSelezionata;

            return matchaRicerca && matchaCategoria;
        });

        // Ordinamento alfabetico
        if (ordineAlfabetico === "A-Z") {
            risultato.sort((a, b) => a.title.localeCompare(b.title));
        } else if (ordineAlfabetico === "Z-A") {
            risultato.sort((a, b) => b.title.localeCompare(a.title));
        }

        return risultato;
    }, [makeupList, parolaCercata, categoriaSelezionata, ordineAlfabetico]);

    return (
        <div className="prodotti-page-container">

            <h1 className="catalogo-titolo">
                {parolaCercata
                    ? `RISULTATI PER: "${parolaCercata.toUpperCase()}"`
                    : "IL NOSTRO CATALOGO"}
            </h1>

            <div className="filtri-container">
                <select
                    className="filtro-select"
                    value={categoriaSelezionata}
                    onChange={(e) => setCategoriaSelezionata(e.target.value)}
                >
                    <option value="">Tutte le categorie</option>
                    {categorieUniche.map((cat) => (
                        <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                    ))}
                </select>

                <select
                    className="filtro-select"
                    value={ordineAlfabetico}
                    onChange={(e) => setOrdineAlfabetico(e.target.value)}
                >
                    <option value="">Ordina per...</option>
                    <option value="A-Z">Nome (A - Z)</option>
                    <option value="Z-A">Nome (Z - A)</option>
                </select>
            </div>

            <div className="products-grid">
                {prodottiFiltrati.length > 0 ? (
                    prodottiFiltrati.map((trucco) => (
                        <ProductCard key={trucco.id} prodotto={trucco} />
                    ))
                ) : (
                    <div className="no-results-msg">
                        <img className="no-results-img" src={imgNonTrovato} alt="Nessun risultato" />
                        <p className="no-results-msg-text">Oh no! Nessun prodotto trovato per "{parolaCercata}"</p>
                        <span>Prova a cercare un'altra categoria, un brand o controlla l'ortografia.</span>
                    </div>
                )}
            </div>

        </div>
    );
}