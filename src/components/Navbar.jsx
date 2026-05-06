import { Link } from "react-router-dom";


export default function Navbar() {
    return (

        <nav className="navbar-container">
            <Link to="/" className="navbar-link">🏠 Home</Link>

            <span>ℹ️ Informazioni</span>
        </nav>
    )
}