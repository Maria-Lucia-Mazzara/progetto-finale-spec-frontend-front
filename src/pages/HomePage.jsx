import { useEffect, useState, useMemo } from "react";
import Jumbo from "../components/Jumbo";
import ProductCard from "../components/ProductCard";

export default function HomePage() {
    const [makeupList, setMakeupList] = useState([]);

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL)
            .then(res => res.json())
            .then(data => setMakeupList(data))
            .catch(error => console.error(error));
    }, []);

    const topTreProdotti = useMemo(() => {
        const listaOrdinata = [...makeupList].sort((a, b) => b.rating - a.rating);
        return listaOrdinata.slice(0, 3);
    }, [makeupList]);

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
                        <div key={prodotto.id || prodotto.title} className={`panel3d ${panelClass}`}>
                            <ProductCard prodotto={prodotto} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}