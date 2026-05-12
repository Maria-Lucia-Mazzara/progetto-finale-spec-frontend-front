import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { HouseIcon } from "@phosphor-icons/react";
import { usePreferiti } from "../context/PreferitiContext";
import { useComparatore } from "../context/ComparatoreContext";

export default function DettaglioProdotto() {
    const { id } = useParams();
    const [prodotto, setProdotto] = useState(null);
    const [loading, setLoading] = useState(true);
    const { preferiti, togglePreferito } = usePreferiti();
    const { comparatore, toggleComparatore } = useComparatore();


    useEffect(() => {
        if (!id || id === 'undefined') {
            setLoading(false);
            return;
        }
        const baseUrl = import.meta.env.VITE_API_URL;

        fetch(baseUrl)
            .then((res) => {
                if (!res.ok) throw new Error("Errore di rete");
                return res.json();
            })
            .then((data) => {
                let prodottoTrovato = null;
                if (Array.isArray(data)) {
                    prodottoTrovato = data.find(item => item.id.toString() === id);
                }
                setProdotto(prodottoTrovato || null);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Errore nel caricamento:", err);
                setProdotto(null);
                setLoading(false);
            });
    }, [id]);


    if (loading) {
        return (
            <div className="loading-screen">
                <p>Musa Cosmetics sta preparando la tua bellezza...</p>
            </div>
        );
    }

    if (!prodotto) {
        return (
            <div className="error-screen">
                <h2>Ops! Il prodotto cercato non è disponibile.</h2>
                <Link to="/prodotti" className="btn-torna-catalogo">Torna al catalogo</Link>
            </div>
        );
    }

    const isPreferito = preferiti.some(p => p.id === prodotto.id);
    const isInComparatore = comparatore.some(p => p.id === prodotto.id);

    const gestisciClickPreferito = () => {
        togglePreferito(prodotto);
        if (!isPreferito) {
            alert("💖 Aggiunto ai tuoi preferiti!");
        } else {
            alert("💔 Rimosso dai preferiti!");
        }
    };

    return (
        <div className="dettaglio-page-container">
            <div className="dettaglio-grid">

                {/* COLONNA FOTO */}
                <div className="dettaglio-left">
                    <div className="dettaglio-foto-wrapper">
                        <img
                            src={prodotto.image}
                            alt={prodotto.title}
                            className="dettaglio-img-principale"
                        />
                    </div>
                </div>

                {/* COLONNA TESTI */}
                <div className="dettaglio-right">
                    <h1 className="dettaglio-titolo-grande">{prodotto.title}</h1>
                    <p className="dettaglio-sottotitolo">{prodotto.brand} | {prodotto.category}</p>

                    <div className="dettaglio-rating-top">
                        {/* Trucchetto elegante per stampare le stelline dinamicamente */}
                        <span className="stelle">
                            {"★".repeat(Math.round(prodotto.rating || 0))}
                            {"☆".repeat(5 - Math.round(prodotto.rating || 0))}
                        </span>
                        <span className="rating-text">({prodotto.rating}/5)</span>
                    </div>

                    <p className="dettaglio-prezzo-grande">
                        {/* getisco il modello del prezzo con due cifre dopo la virgola */}
                        {/* replace, Trasforma il punto decimale in virgola */}
                        {Number(prodotto.price).toFixed(2).replace('.', ',')} €
                    </p>

                    <div className="dettaglio-meta-grid">
                        <span className="meta-label">Tipo di Pelle:</span>
                        <span className="meta-value">{prodotto.skinType}</span>
                    </div>

                    <h3 className="dettaglio-sezione-titolo">Descrizione</h3>
                    <p className="dettaglio-descrizione-testo">{prodotto.description}</p>

                    <div className="dettaglio-bottoni-primari">
                        <Link to="/prodotti" className="btn-torna-catalogo">TORNA AL CATALOGO</Link>

                        <Link to="/" className="btn-home-circle" title="Torna alla Home">
                            <HouseIcon size={32} color="#541926" />
                        </Link>
                    </div>

                    <div className="dettaglio-bottoni-secondari">
                        <button
                            className={`btn-preferito ${isPreferito ? 'salvato' : ''}`}
                            onClick={gestisciClickPreferito}
                        >
                            <span className="cuore-icona">{isPreferito ? '♥' : '♡'}</span>
                            {isPreferito ? 'Salvato' : 'Preferito'}
                        </button>

                        <button
                            className="btn-comparatore"
                            onClick={() => toggleComparatore(prodotto)}
                            style={{
                                backgroundColor: isInComparatore ? 'var(--testo-bordeaux)' : 'transparent',
                                color: isInComparatore ? 'white' : 'var(--testo-bordeaux)'
                            }}
                        >
                            {isInComparatore ? "RIMUOVI DAL CONFRONTO" : "AGGIUNGI AL COMPARATORE"}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}