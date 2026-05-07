import { Link, useNavigate } from "react-router-dom";
import logoMusa from "../assets/logo/logo.png";
import { ShoppingCartIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useState } from "react";


export default function Navbar() {
    const [cerca, setCerca] = useState("");
    const navigate = useNavigate();

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
                <img src={logoMusa} alt="Logo Musa Cosmetics" className="logo-img" />
            </div>


            <div className="navbar-links">
                <Link to="/" className="navbar-link">HOME</Link>
                <Link to="/prodotti" className="navbar-link">PRODOTTI</Link>
                <span className="navbar-link">NOVITÀ</span>
                <span className="navbar-link">BLOG</span>
            </div>


            <div className="navbar-search">
                <span className="cart-icon"><ShoppingCartIcon size={32} color="#541926" /></span>

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