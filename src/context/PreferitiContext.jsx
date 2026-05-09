import { createContext, useState, useEffect, useContext } from "react";
const PreferitiContext = createContext();


export function PreferitiProvider({ children }) {

    const [preferiti, setPreferiti] = useState(() => {
        const salvati = localStorage.getItem("preferiti_musa");
        if (salvati) {
            return JSON.parse(salvati);
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem("preferiti_musa", JSON.stringify(preferiti));
    }, [preferiti]);

    const togglePreferito = (prodotto) => {
        setPreferiti((preferitiAttuali) => {
            const giaPresente = preferitiAttuali.find((p) => String(p.id) === String(prodotto.id));

            if (giaPresente) {
                return preferitiAttuali.filter((p) => String(p.id) !== String(prodotto.id));
            } else {
                return [...preferitiAttuali, prodotto];
            }
        });
    };

    return (
        <PreferitiContext.Provider value={{ preferiti, togglePreferito }}>
            {children}
        </PreferitiContext.Provider>
    );
}
export function usePreferiti() {
    return useContext(PreferitiContext);
}