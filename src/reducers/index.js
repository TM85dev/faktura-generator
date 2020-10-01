
const stateValues = {
    progress: {
        p1: false,
        p2: false,
        p3: false
    },
    sprzedawca: {
        firma: "",
        skrot: "",
        nr_faktury: "",
        ulica: "",
        nr: "",
        // logo: "",
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
        nr_zamowienia: "",
        sposob_zaplaty: "wybierz",
        zaplacono: "wybierz",
        termin_zaplaty: "",
        dni_do_zaplaty: "",
        wplacono: "",
        nazwa_banku: "",
        nr_konta: ""
    },
    przedmioty: {},
    sprzedawcaErrors: {
        firma: "",
        skrot: "",
        nr_faktury: "",
        ulica: "",
        nr: "",
        kod: '',
        miejscowosc: '',
        nip: '',
        regon: '',
        telefon: ''
    },
    klientErrors: {
        nazwa: "",
        ulica: "",
        nr: "",
        miejscowosc: "",
        kod: "",
        telefon: ""
    },
    daneErrors: {
        miejsce_wystawienia: "",
        data_wystawienia: "",
        nr_zamowienia: "",
        sposob_zaplaty: "",
        zaplacono: "",
        termin_zaplaty: "",
        dni_do_zaplaty: "",
        wplacono: ""
    },
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

