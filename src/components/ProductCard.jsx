import { Link } from "react-router-dom";
import { usePreferiti } from "../context/PreferitiContext";
import { useComparatore } from "../context/ComparatoreContext";
import { ArrowsCounterClockwise } from "@phosphor-icons/react";

export default function ProductCard({ prodotto, isPreferitiPage = false }) {

    const { preferiti, togglePreferito } = usePreferiti();
    const { comparatore, toggleComparatore } = useComparatore();
    const isPreferito = preferiti.some(p => String(p.id) === String(prodotto.id));
    const isInComparatore = comparatore.some(p => String(p.id) === String(prodotto.id));

    const handlePreferitoClick = (e) => {
        e.preventDefault();
        togglePreferito(prodotto);
    };

    const handleComparatoreClick = (e) => {
        e.preventDefault();
        toggleComparatore(prodotto);
    };

    return (
        <div className="product-card" style={{ position: 'relative' }}>


            {!isPreferitiPage && (
                <button
                    className={`card-heart-quick ${isPreferito ? 'salvato' : ''}`}
                    onClick={handlePreferitoClick}
                >
                    {isPreferito ? '♥' : '♡'}
                </button>
            )}


            <button
                className={`card-heart-quick ${isInComparatore ? 'salvato' : ''}`}
                style={{ right: 'auto', left: '35px' }}
                onClick={handleComparatoreClick}
            >
                <ArrowsCounterClockwise size={18} weight={isInComparatore ? "bold" : "regular"} />
            </button>

            {/* Foto cliccabile che porta alla pagina dettaglio prodotto*/}
            <Link to={`/prodotti/${prodotto.id}`}>
                <div className="card-image-wrapper">
                    <div className="card-image-inner">
                        <img
                            src={prodotto.image}
                            alt={prodotto.title}
                        />
                    </div>
                </div>
            </Link>

            <h3 className="card-title">{prodotto.title}</h3>
            <p className="card-brand">{prodotto.brand}</p>
            <p className="card-category">{prodotto.category}</p>
            <p className="card-price">
                {Number(prodotto.price).toFixed(2).replace('.', ',')} €
            </p>

            <div className="card-buttons-container">
                <Link to={`/prodotti/${prodotto.id}`} className="card-btn">
                    DETTAGLIO
                </Link>

                {isPreferitiPage && (
                    <button className="card-btn-rimuovi" onClick={handlePreferitoClick}>
                        RIMUOVI
                    </button>
                )}
            </div>
        </div>
    );
}