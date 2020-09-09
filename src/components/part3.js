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

        const selected = name==="selected_price" ? value : itemInputs.selected_price;
        const netto = name==="netto" ? Number(value) : Number(itemInputs.netto);
        const brutto = name==="brutto" ? Number(value) : Number(itemInputs.brutto);
        const vat = name==="vat" ? Number(value) : Number(itemInputs.vat);
        const calcBrutto = netto + (netto * vat / 100);
        const calcNetto = brutto - (brutto * vat / 100);
        const data = {
            ...itemInputs,
            [name]: value,
            netto: selected==="brutto_selected" ? calcNetto.toFixed(2) : name==="netto" ? Number(value) : Number(itemInputs.netto),
            brutto: selected==="netto_selected" ? calcBrutto.toFixed(2) : name==="brutto" ? Number(value) : Number(itemInputs.brutto),
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
                Rodzaj: &nbsp;
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
                Cena brutton: &nbsp;
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
        const data = {
            ...values,
            [name]: value
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
                vat: ""
            }
        }));
    }
    const saveInputs = () => {
        const all = {
            netto: 0,
            brutto: 0,
            vat: 0,
            stawka_23: [],
            stawka_8: [],
            stawka_5: [],
            stawka_0: []
        };
        Object.values(przedmioty).forEach(przedmiot => {
            all.netto += parseFloat(przedmiot.netto);
            all.brutto += parseFloat(przedmiot.brutto);
            all.vat += parseFloat(przedmiot.brutto) - parseFloat(przedmiot.netto);
            if(przedmiot.vat === "23") {
                all.stawka_23.push(przedmiot)
            } else if(przedmiot.vat === "8") {
                all.stawka_8.push(przedmiot)
            } else if(przedmiot.vat === "5") {
                all.stawka_5.push(przedmiot)
            } else if(przedmiot.vat === "0") {
                all.stawka_0.push(przedmiot)
            }
            
        });
        const suma = (tablica, stawka) => {
            const suma = {
                netto: 0,
                brutto: 0,
                stawka_vat: `${stawka}%`,
                kwota_vat: 0
            }
            tablica.forEach(przedmiot => {
                suma.netto += parseFloat(przedmiot.netto);
                suma.brutto += parseFloat(przedmiot.brutto);
                suma.kwota_vat += (parseFloat(przedmiot.brutto) - parseFloat(przedmiot.netto))
            })
            const sumaFixed = {
                netto: suma.netto.toFixed(2),
                brutto: suma.brutto.toFixed(2),
                stawka_vat: suma.stawka_vat,
                kwota_vat: suma.kwota_vat.toFixed(2)
            }
            return (tablica.length > 0) ? sumaFixed : null
        }
        const parsedData = {
            netto: all.netto.toFixed(2),
            brutto: all.brutto.toFixed(2),
            vat: all.vat.toFixed(2),
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