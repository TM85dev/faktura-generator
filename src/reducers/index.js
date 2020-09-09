
const stateValues = {
    sprzedawca: {
        firma: "",
        skrot: "",
        nr_faktury: "",
        ulica: "",
        nr: "",
        logo: "",
        kod: '',
        miejscowosc: '',
        nip: '',
        regon: '',
        telefon: ''
    },
    klient: {
        nazwa: "",
        ulica: "",
        nr: "",
        miejscowosc: "",
        kod: "",
        telefon: ""
    },
    dane: {
        miejsce_wystawienia: "",
        data_wystawienia: "",
        nr_zamowienia: ""
    },
    przedmioty: {}
}

export default function setInputs(state = stateValues, action) {
    switch (action.type) {
        case "SET_INPUTS":
            return {
                ...state, 
                ...action.payload
            };
        case "SET_ITEMS":
            return {
                ...state,
                przedmioty: {
                    ...state.przedmioty,
                    ...action.payload
                }
                
            };
        default:
            return state;
    }
}

