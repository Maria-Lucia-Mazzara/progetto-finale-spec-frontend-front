import { useEffect, useState } from "react";
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

    return (
        <div className="homepage-container">
            <Jumbo />

            <h1 className="catalogo-titolo">L'Essenza della Bellezza</h1>

            <div className="products-grid">
                {makeupList.map((prodotto) => {
                    return (
                        <ProductCard key={prodotto.id} prodotto={prodotto} />
                    );
                })}
            </div>
        </div>
    );
}