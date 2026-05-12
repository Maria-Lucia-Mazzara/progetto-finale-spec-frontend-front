import { createContext, useState, useContext } from "react";

//Creazione del Context
const ComparatoreContext = createContext();

export function ComparatoreProvider({ children }) {

    const [comparatore, setComparatore] = useState([]);


    const toggleComparatore = (prodotto) => {
        setComparatore((attuali) => {
            // Controllo se il prodotto è già stato inserito comparatore
            const giaPresente = attuali.find((p) => p.id === prodotto.id);

            // Se il prodotto esiste già, lo rimuovo dall'array
            if (giaPresente) {
                return attuali.filter((p) => p.id !== prodotto.id);
            }
            // questo mi dice se ci sono già più di due prodotti nel comparatore manda l'errore
            if (attuali.length >= 2) {
                alert("Puoi confrontare solo 2 prodotti alla volta! Rimuovine uno per aggiungerne un altro.");
                return attuali;
            }
            // Se non è presente e c'è spazio, aggiungo il nuovo prodotto
            return [...attuali, prodotto];
        });
    };

    return (
        <ComparatoreContext.Provider value={{ comparatore, toggleComparatore }}>
            {children}
        </ComparatoreContext.Provider>
    );
}

// Custom Hook per permettere ai componenti di accedere facilmente ai dati globali
export function useComparatore() {
    return useContext(ComparatoreContext);
}