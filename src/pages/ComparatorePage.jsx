import { useComparatore } from "../context/ComparatoreContext";
import { Link } from "react-router-dom";

export default function ComparatorePage() {
    const { comparatore, toggleComparatore } = useComparatore();

    return (
        <div className="prodotti-page-container">
            <h1 className="catalogo-titolo">CONFRONTA PRODOTTI</h1>

            {comparatore.length === 0 ? (
                <div className="empty-preferiti-msg">
                    <h2>Non hai selezionato prodotti da confrontare.</h2>
                    <p>Scegli due prodotti dal catalogo per vedere le differenze.</p>
                    <Link to="/prodotti" className="btn-torna-catalogo">VAI AL CATALOGO</Link>
                </div>
            ) : (
                <div className="comparatore-wrapper">
                    <div className="comparatore-grid-flex">
                        {comparatore.map((p) => (
                            <div key={p.id} className="comparatore-card">
                                <button className="btn-rimuovi-x" onClick={() => toggleComparatore(p)}>X</button>
                                <img src={p.image} alt={p.title} />
                                <h3>{p.title}</h3>
                                <p><strong>Brand:</strong> {p.brand}</p>
                                <p><strong>Categoria:</strong> {p.category}</p>
                                <p><strong>Pelle:</strong> {p.skinType}</p>
                                <p className="comp-prezzo">{Number(p.price).toFixed(2)} €</p>
                                <Link to={`/prodotti/${p.id}`} className="card-btn">DETTAGLIO</Link>
                            </div>
                        ))}

                        {comparatore.length === 1 && (
                            <div className="comparatore-card placeholder-card">
                                <p>Aggiungi un altro prodotto per il confronto</p>
                                <Link to="/prodotti" className="btn-torna-catalogo">CATALOGO</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}