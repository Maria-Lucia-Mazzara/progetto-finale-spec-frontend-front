import { useEffect, useState, useMemo } from "react";
import Jumbo from "../components/Jumbo";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
    const [makeupList, setMakeupList] = useState([]);

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL)
            .then(res => res.json())
            .then(data => setMakeupList(data))
            .catch(error => console.error("Errore nel caricamento:", error));
    }, []);

    // Utilizzo useMemo per memorizzare il risultato ed evitare ricalcoli inutili ad ogni render 
    const topTreProdotti = useMemo(() => {
        // Creo una copia dell'array con lo spread operator [...] 
        // Ordino la lista con sort, dal valore più alto al più basso
        const listaOrdinata = [...makeupList].sort((a, b) => b.rating - a.rating);

        // Estraggo solo i primi tre elementi della classifica (i bestseller da mostrare in Home)
        return listaOrdinata.slice(0, 3);

    }, [makeupList]); // La dipendenza: il calcolo viene rieseguito solo se makeupList subisce modifiche

    return (
        <div className="homepage-container">

            <Jumbo />

            <h1 className="catalogo-titolo">I Nostri Bestseller</h1>

            <div className="triple-panel-container">
                {topTreProdotti.map((prodotto, index) => {
                    let panelClass = "panel-center";
                    if (index === 0) panelClass = "panel-left";
                    if (index === 2) panelClass = "panel-right";

                    return (
                        <div key={prodotto.id} className={`panel3d ${panelClass}`}>
                            <ProductCard prodotto={prodotto} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}