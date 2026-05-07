import { Link } from "react-router-dom";
import videoSfondo from "../assets/video/video.mp4";

export default function Jumbo() {
    return (
        <div className="jumbo-container">
            <video autoPlay loop muted playsInline className="jumbo-video">
                <source src={videoSfondo} type="video/mp4" />
            </video>

            <div className="jumbo-overlay"></div>

            <div className="jumbo-content">
                <h1 className="jumbo-title">LA TUA BELLEZZA,<br />IL TUO STILE</h1>
                <p className="jumbo-subtitle">
                    Ciò che mancava al tuo stile, finalmente a portata di clic.
                </p>
                <Link to="/prodotti" className="jumbo-btn">
                    SHOP NOW
                </Link>
            </div>
        </div>
    );
}