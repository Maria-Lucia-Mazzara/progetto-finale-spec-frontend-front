
import { usePreferiti } from "../context/PreferitiContext";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

export default function PreferitiPage() {
    const { preferiti } = usePreferiti();

    return (
        <div className="prodotti-page-container">
            <h1 className="catalogo-titolo">I TUOI PREFERITI</h1>

            {preferiti.length === 0 ? (
                <div className="empty-preferiti-msg">
                    <h2>Nessun trucco salvato al momento.</h2>
                    <p>Esplora il nostro catalogo e aggiungi i tuoi prodotti del cuore!</p>
                    <Link to="/prodotti" className="btn-torna-catalogo">
                        VAI AL CATALOGO
                    </Link>
                </div>
            ) : (
                <div className="products-grid">
                    {preferiti.map((trucco) => (
                        <ProductCard key={trucco.id} prodotto={trucco} isPreferitiPage={true} />
                    ))}
                </div>
            )}
        </div>
    );
}