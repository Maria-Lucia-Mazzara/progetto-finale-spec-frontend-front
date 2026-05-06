import { Link } from "react-router-dom";
import logoMusa from "../assets/logo/logo.png";
import { ShoppingCartIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";


export default function Navbar() {
    return (
        <nav className="navbar-container">

            <div className="navbar-logo">
                <img src={logoMusa} alt="Logo Musa Cosmetics" className="logo-img" />
            </div>


            <div className="navbar-links">
                <Link to="/" className="navbar-link">HOME</Link>
                <span className="navbar-link">PRODOTTI</span>
                <span className="navbar-link">NOVITÀ</span>
                <span className="navbar-link">BLOG</span>
            </div>


            <div className="navbar-search">
                <span className="cart-icon"><ShoppingCartIcon size={32} color="#541926" /></span>

                <div className="search-input-container">
                    <input type="text" placeholder="Cerca i tuoi trucchi..." />
                    <button className="search-btn"><MagnifyingGlassIcon size={32} color="#541926" /></button>
                </div>
            </div>

        </nav>
    )
}