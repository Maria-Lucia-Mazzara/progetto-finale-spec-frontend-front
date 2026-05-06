
export default function ProductCard({ prodotto }) {
    return (
        <div className="product-card">
            <div className="card-image-wrapper">
                <div className="card-image-inner">
                    <img
                        src={prodotto.image}
                    />
                </div>
            </div>

            <h3 className="card-title">{prodotto.title}</h3>
            <p className="card-category">{prodotto.category}</p>
            <p className="card-price">{prodotto.price} €</p>
            <button className="card-btn">ACQUISTA</button>
        </div>
    );
}