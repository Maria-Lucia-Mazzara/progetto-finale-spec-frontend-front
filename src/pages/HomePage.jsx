import { useEffect, useState } from "react";
import Jumbo from "../components/Jumbo";

export default function HomePage() {
    const [makeupList, setMakeupList] = useState([])

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL)
            .then(res => res.json())
            .then(data => setMakeupList(data))
            .catch(error => console.error(error));
    }, [])

    return (
        <div>

            <Jumbo />


            <h1>💄Catalogo trucchi</h1>
            {makeupList.map((prodotto) => {
                return (
                    <div key={prodotto.id}>
                        <h3>{prodotto.title}</h3>
                        <p>{prodotto.category}</p>
                    </div>
                )
            })}
        </div>
    );
}