import { createContext, useState, useEffect, useContext } from "react";

// 1. Creo la context, dove i dati vanno in memoria
const PreferitiContext = createContext();

export function PreferitiProvider({ children }) {


    const [preferiti, setPreferiti] = useState(() => {
        // getItem prende gli elementi in memoria. 
        const salvati = localStorage.getItem("preferiti_musa");
        if (salvati) {
            // condizione se ci sono oggetti in memoria, prendili trasformali in oggetti js per leggerli in pagina 
            return JSON.parse(salvati);
        }
        return [];
    });

    useEffect(() => {
        // controlla se la pagina preferiti è vuota o se sono presenti preferiti 
        if (preferiti.length > 0 || localStorage.getItem("preferiti_musa")) {
            // Trasforma l'array in stringa di testo e lo salva in memoria
            localStorage.setItem("preferiti_musa", JSON.stringify(preferiti));
        }
        // questo significa fallo ogni volta che la pagina apporta delle modifiche
    }, [preferiti]);


    const togglePreferito = (prodotto) => {
        setPreferiti((preferitiAttuali) => {
            // controlla se già non c'è lo stesso prodotto nei preferiti 
            const giaPresente = preferitiAttuali.find((p) => p.id === prodotto.id);
            if (giaPresente) {
                // Se c'è già rimuovilo
                return preferitiAttuali.filter((p) => p.id !== prodotto.id);
            } else {
                // Se non c'è aggiungilo
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

// Custom Hook per permettere ai componenti di accedere facilmente ai dati globali
export function usePreferiti() {
    return useContext(PreferitiContext);
}