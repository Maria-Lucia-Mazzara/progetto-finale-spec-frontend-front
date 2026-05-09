import { Link } from "react-router-dom";

export default function ProductCard({ prodotto }) {
    return (
        <div className="product-card">
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
            <p className="card-price">{prodotto.price} €</p>

            {/* bottone collegato alla pagina dettaglio di prodotto */}
            <Link to={`/prodotti/${prodotto.id}`} className="card-btn">
                DETTAGLIO
            </Link>
        </div>
    );
}