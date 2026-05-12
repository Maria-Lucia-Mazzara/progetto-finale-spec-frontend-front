import { createContext, useState, useEffect, useContext } from "react";

// 1. Creo la context, dove i dati vanno in memoria
const PreferitiContext = createContext();

export function PreferitiProvider({ children }) {


    const [preferiti, setPreferiti] = useState([]);


    useEffect(() => {
        const salvati = localStorage.getItem("preferiti_musa");
        if (salvati) {
            setPreferiti(JSON.parse(salvati));
        }
    }, []);


    useEffect(() => {

        if (preferiti.length > 0 || localStorage.getItem("preferiti_musa")) {
            localStorage.setItem("preferiti_musa", JSON.stringify(preferiti));
        }
    }, [preferiti]);


    const togglePreferito = (prodotto) => {
        setPreferiti((preferitiAttuali) => {
            const giaPresente = preferitiAttuali.find((p) => p.id === prodotto.id);
            if (giaPresente) {

                return preferitiAttuali.filter((p) => p.id !== prodotto.id);
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