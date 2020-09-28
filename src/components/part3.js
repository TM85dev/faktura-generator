import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { setInputs, setItems } from '../actions';
import Input from './input';
import InputSelect from './inputSelect';
import NewItem from './newItem';


function Part3() {
    const dispatch = useDispatch();
    const dane = useSelector(state => state.dane);
    const errors = useSelector(state => state.daneErrors);
    const przedmioty = useSelector(state => state.przedmioty);
    const [activation, setActivation] = useState(false);
    const progress = useSelector(state => state.progress);
    const [inputElements, setInputElements] = useState("");

    const changeHandler = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const inputs = {...dane, [name]: value};
        const dataErrors = {...errors, [name]: value.length < 1 ? "uzupełnij" : ""};
        const termin = () => {
            const data = new Date(inputs.data_wystawienia).getTime();
            const termin = new Date(inputs.termin_zaplaty).getTime();
            const dni = (termin - data) / 86400000
            return dni
        }
        const data = {
            ...dane,
            [name]: value,
            wplacono: isNaN(inputs.wplacono) ? "" : Number(inputs.wplacono),
            dni_do_zaplaty: (name==="zaplacono" && value==="tak") ? 0 : termin()
        }
        const activated = () => {
            const verif = Object.values(dataErrors).filter(errors => errors.length > 0);
            return verif.length===0 ? true : false;
        };
        setActivation(activated());
        dispatch(setInputs({daneErrors: dataErrors, dane: data}));
    }
    const addNewItem = () => {
        setInputElements(prevState => ([
            ...prevState,
            <NewItem key={inputElements.length} num={inputElements.length} />
        ]));
        dispatch(setItems({
            [inputElements.length]: {
                nazwa: "",
                ilosc: "1",
                jm: "wybierz",
                netto: "",
                brutto: "",
                vat: 0,
                wartosc_netto: "",
                wartosc_brutto: "",
                selected_price: "wybierz"
            }
        }));
    }
    const saveInputs = () => {
        const all = {
            wartosc_netto: 0,
            wartosc_brutto: 0,
            vat: 0,
            stawka_23: [],
            stawka_8: [],
            stawka_5: [],
            stawka_0: []
        };
        Object.values(przedmioty).forEach(przedmiot => {
            all.wartosc_netto += parseFloat(przedmiot.wartosc_netto);
            all.wartosc_brutto += parseFloat(przedmiot.wartosc_brutto);
            all.vat += parseFloat(przedmiot.wartosc_brutto) - parseFloat(przedmiot.wartosc_netto);
            if(przedmiot.vat === 23) {
                all.stawka_23.push(przedmiot)
            } else if(przedmiot.vat === 8) {
                all.stawka_8.push(przedmiot)
            } else if(przedmiot.vat === 5) {
                all.stawka_5.push(przedmiot)
            } else if(przedmiot.vat === 0) {
                all.stawka_0.push(przedmiot)
            }
            
        });
        const suma = (tablica, stawka) => {
            const suma = {
                wartosc_netto: 0,
                wartosc_brutto: 0,
                stawka_vat: `${stawka}%`,
                kwota_vat: 0
            }
            tablica.forEach(przedmiot => {
                suma.wartosc_netto += parseFloat(przedmiot.wartosc_netto);
                suma.wartosc_brutto += parseFloat(przedmiot.wartosc_brutto);
                suma.kwota_vat += (parseFloat(przedmiot.wartosc_brutto) - parseFloat(przedmiot.wartosc_netto))
            })
            const sumaFixed = {
                netto: suma.wartosc_netto,
                brutto: suma.wartosc_brutto,
                stawka_vat: suma.stawka_vat,
                kwota_vat: Number(suma.kwota_vat).toFixed(2)
            }
            return (tablica.length > 0) ? sumaFixed : null
        }
        const parsedData = {
            netto: all.wartosc_netto,
            brutto: all.wartosc_brutto,
            vat: Number(all.vat).toFixed(2),
            stawka_23: suma(all.stawka_23, 23),
            stawka_8: suma(all.stawka_8, 8),
            stawka_5: suma(all.stawka_5, 5),
            stawka_0: suma(all.stawka_0, 0)
        }
        const dataErrors = {
            miejsce_wystawienia: dane.miejsce_wystawienia.length!==0 ? "" : "uzupełnij",
            data_wystawienia: dane.data_wystawienia.length!==0 ? "" : "uzupełnij",
            nr_zamowienia: dane.nr_zamowienia.length!==0 ? "" : "uzupełnij",
            sposob_zaplaty: dane.sposob_zaplaty.length!==0 && dane.sposob_zaplaty!=="wybierz" ? "" : "uzupełnij",
            zaplacono: dane.zaplacono.length!==0 && dane.sposob_zaplaty!=="wybierz" ? "" : "uzupełnij",
            termin_zaplaty: dane.termin_zaplaty.length!==0 || dane.zaplacono==="tak" ? "" : "uzupełnij",
            dni_do_zaplaty: dane.dni_do_zaplaty.length!==0 ? "" : "uzupełnij",
            wplacono: dane.wplacono.length!==0 ? "" : "uzupełnij",
        }
        const verification = () => {
            const verif = Object.values(dataErrors).filter(errors => errors.length > 0);
            return verif.length===0 ? true : false;
        };
        const dataProgress = {...progress, p3: verification()};
        dispatch(setInputs({progress: dataProgress, daneErrors: dataErrors, suma: {...parsedData}}))
    }
    const dataInputs = [
        {inputName: "Miejsce wystawienia", valueName: dane.miejsce_wystawienia, name: "miejsce_wystawienia", type: "text", error: errors.miejsce_wystawienia},
        {inputName: "Data wystawienia", valueName: dane.data_wystawienia, name: "data_wystawienia", type: "date", error: errors.data_wystawienia},
        {inputName: "Nr zamówienia", valueName: dane.nr_zamowienia, name: "nr_zamowienia", type: "text", error: errors.nr_zamowienia},
        {inputName: "Termin zapłaty", valueName: dane.termin_zaplaty, name: "termin_zaplaty", type: "date", error: errors.termin_zaplaty},
        {inputName: "Wpłacono", valueName: dane.wplacono, name: "wplacono", type: "text", error: errors.wplacono}

    ];

    return(
        <div className="dane">
            <h1>Dane do faktury</h1>
            {dataInputs.slice(0, 2).map(item => (
                <div key={item.name}>
                    <Input 
                        type={item.type}
                        value={item.valueName}
                        name={item.name}
                        namePL={item.inputName.toUpperCase()}
                        onChange={changeHandler}
                        error={item.error}
                    />
                </div>
            ))}
            <div className="sposob-zaplaty">
                <InputSelect 
                    name="sposob_zaplaty"
                    namePL="Sposób zapłaty"
                    value={dane.sposob_zaplaty}
                    onChange={changeHandler}
                    variables={["przelew", "gotówka"]}
                    error={errors.sposob_zaplaty}
                />
            </div>
            <div className="zaplacono">
                <InputSelect 
                    name="zaplacono"
                    namePL="Zapłacono"
                    value={dane.zaplacono}
                    onChange={changeHandler}
                    variables={["tak", "nie"]}
                    error={errors.zaplacono}
                />
            </div>
            {dataInputs.slice(2).map((item, index) => (
                <div key={index} style={{display: `${index===1 ? (dane.zaplacono==="nie" ? "" : "none") : ""}`}}>
                    <Input 
                        type={item.type}
                        value={item.valueName}
                        name={item.name}
                        namePL={item.inputName.toUpperCase()}
                        onChange={changeHandler}
                        error={item.error}
                    />
                </div>
            ))}
            <div className="przedmioty">
                {inputElements}
            </div>
            <div className="navigation">
                <button onClick={addNewItem}>dodaj</button>
                <button onClick={saveInputs}>zapisz</button>
            </div>
            <div className="navigation">
                <NavLink style={{width: "160px"}} exact to="/pdf" className={progress.p3 ? "" : "disabled"}>wygeneruj fakturę</NavLink>
            </div>
        </div>
    )
}

export default Part3;