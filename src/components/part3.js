import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInputs, setItems } from '../actions';


function NewItem({ num }) {
    const dispatch = useDispatch();
    const itemInputs = useSelector(state => state.przedmioty[num]);

    const changeItem = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        const item = {
            ...itemInputs,
            [name]: value
        }
        const selected = item.selected_price;
        const netto = Number(item.netto);
        const brutto = Number(item.brutto);
        const vat = Number(item.vat);
        const calcBrutto = selected==="brutto_selected" ? brutto : (netto + (netto * vat / 100)).toFixed(2);
        const calcNetto = selected==="netto_selected" ? netto : (brutto - (brutto * vat / 100)).toFixed(2);
        const ilosc = Number(item.ilosc);
        const data = {
            ...item,
            [name]: value,
            vat: vat,
            ilosc: ilosc,
            netto: Number(calcNetto),
            brutto: Number(calcBrutto),
            wartosc_netto: Number(ilosc > 0 ? (ilosc * calcNetto) : calcNetto).toFixed(2),
            wartosc_brutto: Number(ilosc > 0 ? (ilosc * calcBrutto) : calcBrutto).toFixed(2)

        }
        dispatch(setItems({[num]: data}));
    }
    return (
        <li>
            <label>
                Nazwa towaru lub usługi: &nbsp;
                <input value={itemInputs.nazwa} onChange={changeItem} name="nazwa" />
            </label><br/>
            <label>
                Ilość: &nbsp;
                <input type="number" value={itemInputs.ilosc} onChange={changeItem} name="ilosc" />
            </label><br/>
            <label>
                J.m.: &nbsp;
                <select value={itemInputs.rodzaj} onChange={changeItem} name="rodzaj" >
                    <option value="">wybierz</option>
                    <option value="szt.">szt.</option>
                    <option value="op.">op.</option>
                </select>
            </label><br/>
            <div>
                Podaj cenę <br/>
                <label>
                    Netto 
                    <input type="radio" name="selected_price" value="netto_selected" onChange={changeItem} />
                </label>
                <label>
                    Brutto 
                    <input type="radio" name="selected_price" value="brutto_selected" onChange={changeItem} />
                </label>
            </div>
            <label>
                Cena netto: &nbsp;
                <input 
                    type="number" 
                    value={itemInputs.netto} 
                    onChange={changeItem} 
                    name="netto"
                    disabled={itemInputs.selected_price==="netto_selected" ? false : true} />
            </label><br/>
            <label>
                Cena brutto: &nbsp;
                <input 
                    type="number" 
                    value={itemInputs.brutto} 
                    onChange={changeItem} 
                    name="brutto"
                    disabled={itemInputs.selected_price==="brutto_selected" ? false : true} />
            </label><br/>
            <label>
                Stawka VAT: &nbsp;
                <select value={itemInputs.vat} onChange={changeItem} name="vat">
                    <option value="">wybierz</option>
                    <option value="23">23%</option>
                    <option value="8">8%</option>
                    <option value="5">5%</option>
                    <option value="0">0%</option>
                </select>
            </label>
        </li>
    )
}

function Part3() {
    const dispatch = useDispatch();
    const [values, setValues] = useState(useSelector(state => state.dane));
    const [inputElements, setInputElements] = useState("");
    const przedmioty = useSelector(state => state.przedmioty);

    const changeHandler = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const inputs = {
            ...values,
            [name]: value,
        }
        const termin = () => {
            const data = new Date(inputs.data_wystawienia).getTime();
            const termin = new Date(inputs.termin_zaplaty).getTime();
            const dni = (termin - data) / 86400000
            return dni
        }
        const data = {
            ...values,
            [name]: value,
            wplacono: Number(inputs.wplacono),
            dni_do_zaplaty: (name==="zaplacono" && value==="tak") ? 0 : termin()
        }
        setValues(data);
        dispatch(setInputs({dane: data}));
    }
    const addNewItem = () => {
        setInputElements(prevState => ([
            ...prevState,
            <NewItem key={inputElements.length} num={inputElements.length} />
        ]));
        dispatch(setItems({
            [inputElements.length]: {
                nazwa: "",
                ilosc: "",
                rodzaj: "",
                netto: "",
                brutto: "",
                vat: "",
                wartosc_netto: "",
                wartosc_brutto: ""
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
        dispatch(setInputs({suma: {...parsedData}}))
    }
    return(
        <div>
            <h1>Dane do faktury:</h1>
            <div>
                <label>
                    Miejsce wystawienia: 
                    <input 
                        value={values.miejsce_wystawienia} 
                        onChange={changeHandler} 
                        name="miejsce_wystawienia"
                        type="text"
                    />
                </label>
            </div>
            <div>
                <label>
                    Data wystawienia: 
                    <input 
                        value={values.data_wystawienia} 
                        onChange={changeHandler} 
                        name="data_wystawienia"
                        type="date"
                    />
                </label>
            </div>
            <div>
                <label>
                    Nr zamówienia: 
                    <input 
                        value={values.nr_zamowienia} 
                        onChange={changeHandler} 
                        name="nr_zamowienia"
                        type="number"
                    />
                </label>
            </div>
            <div>
                <label>
                    Sposób zapłaty:
                    <select value={values.sposob_zaplaty} onChange={changeHandler} name="sposob_zaplaty">
                        <option value="">wybierz</option>
                        <option value="przelew">przelew</option>
                        <option value="gotówka">gotówka</option>
                    </select>
                </label>
            </div>
            <div>
                Zapłacono: &nbsp;
                <label>
                    Tak <input onChange={changeHandler} type="radio" name="zaplacono" value="tak" />
                </label>
                <label>
                    Nie <input onChange={changeHandler} type="radio" name="zaplacono" value="nie" />
                </label>
            </div>
            <div style={{display: `${values.zaplacono==="nie" ? "" : "none"}`}}>
                <label>
                    Termin zapłaty: 
                    <input type="date" value={values.termin_zaplaty} onChange={changeHandler} name="termin_zaplaty" />
                </label>
            </div>
            <div>
                <label>
                    Wpłacono:
                    <input type="number" value={values.wplacono} onChange={changeHandler} name="wplacono" />
                </label>
            </div>
            <div>
                <button onClick={addNewItem}>add item</button>
            </div>
            <ol>
                {inputElements}
            </ol>
            <div>
                <button onClick={saveInputs}>save</button>
            </div>
        </div>
    )
}

export default Part3;