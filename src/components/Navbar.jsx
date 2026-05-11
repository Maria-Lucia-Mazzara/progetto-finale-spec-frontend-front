import { Link, useNavigate } from "react-router-dom";
import logoMusa from "../assets/logo/logo.png";
import { MagnifyingGlassIcon, HeartIcon, ArrowsCounterClockwise } from "@phosphor-icons/react";
import { useState } from "react";
import { usePreferiti } from "../context/PreferitiContext";
import { useComparatore } from "../context/ComparatoreContext";


export default function Navbar() {
    const [cerca, setCerca] = useState("");
    const navigate = useNavigate();
    const { preferiti } = usePreferiti();
    const { comparatore } = useComparatore();

    const gestisciRicerca = (e) => {
        e.preventDefault();
        if (cerca.trim() !== "")
        // questa condizione mi dice se il campo non è vuoto cercami l'imput dell'utente
        {
            navigate(`/prodotti?search=${cerca}`);
        }
    };

    return (
        <nav className="navbar-container">

            <div className="navbar-logo">
                <Link to="/">
                    <img src={logoMusa} alt="Logo Musa Cosmetics" className="logo-img" />
                </Link>
            </div>


            <div className="navbar-links">
                <Link to="/" className="navbar-link">HOME</Link>
                <Link to="/prodotti" className="navbar-link">PRODOTTI</Link>
                <Link to="/comparatore" className="navbar-link">CONFRONTA</Link>
            </div>


            <div className="navbar-search">


                <Link to="/comparatore" className="cart-icon preferiti-icon-wrapper" style={{ marginRight: '10px' }}>
                    <ArrowsCounterClockwise size={32} color="#541926" />
                    {comparatore.length > 0 && (
                        <span className="badge-preferiti" style={{ backgroundColor: '#541926' }}>
                            {comparatore.length}
                        </span>
                    )}
                </Link>

                <Link to="/preferiti" className="cart-icon preferiti-icon-wrapper">
                    <HeartIcon size={32} color="#541926" />
                    {preferiti.length > 0 && (
                        <span className="badge-preferiti">
                            {preferiti.length}
                        </span>
                    )}
                </Link>

                <form className="search-input-container" onSubmit={gestisciRicerca}>
                    <input
                        type="text"
                        placeholder="Cerca i tuoi trucchi..."
                        value={cerca}
                        onChange={(e) => setCerca(e.target.value)}
                    />
                    <button type="submit" className="search-btn">
                        <MagnifyingGlassIcon size={32} color="#541926" />
                    </button>
                </form>
            </div>

        </nav>
    )

}