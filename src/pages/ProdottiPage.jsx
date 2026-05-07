import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function ProdottiPage() {
    const [makeupList, setMakeupList] = useState([]);
    const [searchParams] = useSearchParams();
    const parolaCercata = searchParams.get("search") || "";

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL)
            .then(res => res.json())
            .then(data => setMakeupList(data))
            .catch(error => console.error(error));
    }, []);

    const prodottiFiltrati = makeupList.filter((prodotto) => {
        const nomeProdotto = prodotto.title.toLowerCase();
        const categoriaProdotto = (prodotto.category || "").toLowerCase();
        const ricerca = parolaCercata.toLowerCase();

        // Ritorna il valore  se la ricerca è nel titolo OPPURE nella categoria
        return nomeProdotto.includes(ricerca) || categoriaProdotto.includes(ricerca);
    });
    return (
        <div className="prodotti-page-container">

            <h1 className="catalogo-titolo">
                {parolaCercata
                    ? `RISULTATI PER: "${parolaCercata.toUpperCase()}"`
                    : "IL NOSTRO CATALOGO"}
            </h1>

            <div className="products-grid">
                {prodottiFiltrati.length > 0 ? (
                    prodottiFiltrati.map((trucco) => (
                        <ProductCard key={trucco.id || trucco.title} prodotto={trucco} />
                    ))
                ) : (
                    <div className="no-results-msg">
                        <img className="no-results-img" src="./src/assets/non_trovato/non_trovato.png" />
                        <p className="no-results-msg-text">Oh no! Nessun prodotto trovato per "{parolaCercata}"</p>
                        <span>Prova a cercare un'altra categoria, un brand o controlla l'ortografia.</span>
                    </div>
                )}
            </div>

        </div>
    );
}