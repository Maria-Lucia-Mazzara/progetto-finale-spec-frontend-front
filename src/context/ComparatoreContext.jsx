import { createContext, useState, useContext } from "react";

//Creazione del Context
const ComparatoreContext = createContext();

export function ComparatoreProvider({ children }) {

    const [comparatore, setComparatore] = useState([]);


    const toggleComparatore = (prodotto) => {
        setComparatore((attuali) => {
            const giaPresente = attuali.find((p) => p.id === prodotto.id);

            if (giaPresente) {
                return attuali.filter((p) => p.id !== prodotto.id);
            }
            if (attuali.length >= 2) {
                alert("Puoi confrontare solo 2 prodotti alla volta! Rimuovine uno per aggiungerne un altro.");
                return attuali;
            }
            return [...attuali, prodotto];
        });
    };

    return (
        <ComparatoreContext.Provider value={{ comparatore, toggleComparatore }}>
            {children}
        </ComparatoreContext.Provider>
    );
}

//Custom Hook per l'esportazione senza destrutturazione
export function useComparatore() {
    return useContext(ComparatoreContext);
}