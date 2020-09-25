import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setItems } from '../actions/index';
import Input from './input';
import InputSelect from './inputSelect';

function NewItem({ num }) {
    const dispatch = useDispatch();
    const przedmiot = useSelector(state => state.przedmioty[num]);
    const dataInputs = [
        {inputName: "Nazwa towaru/usługi", valueName: przedmiot.nazwa, name: "nazwa"},
        {inputName: "Ilość", valueName: przedmiot.ilosc, name: "ilosc"},
    ]

    const changeItem = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        const item = {
            ...przedmiot,
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
            ilosc: isNaN(ilosc) ? "" : ilosc,
            netto: Number(calcNetto),
            brutto: Number(calcBrutto),
            wartosc_netto: Number(ilosc > 0 ? (ilosc * calcNetto) : calcNetto).toFixed(2),
            wartosc_brutto: Number(ilosc > 0 ? (ilosc * calcBrutto) : calcBrutto).toFixed(2)

        }
        dispatch(setItems({[num]: data}));
    }
    return (
        <div className="przedmiot">
            <div style={{margin: "16px 0 -20px 16px"}}>{num + 1}</div>
            {dataInputs.map((item, index) => (
                <div key={index}>
                    <Input 
                        type="text"
                        value={item.valueName}
                        name={item.name}
                        namePL={item.inputName.toUpperCase()}
                        onChange={changeItem}
                        error=""
                    />
                </div>
            ))}
            {/* <label>
                Nazwa towaru lub usługi: &nbsp;
                <input value={itemInputs.nazwa} onChange={changeItem} name="nazwa" />
            </label><br/> */}
            {/* <label>
                Ilość: &nbsp;
                <input type="number" value={itemInputs.ilosc} onChange={changeItem} name="ilosc" />
            </label><br/> */}
            <div>
                <InputSelect 
                    name="jm"
                    namePL="J.m."
                    value={przedmiot.jm}
                    onChange={changeItem}
                    variables={["szt.", "op."]}
                    num={num}
                    error=""
                />
            </div>
            {/* <label>
                J.m.: &nbsp;
                <select value={itemInputs.rodzaj} onChange={changeItem} name="rodzaj" >
                    <option value="">wybierz</option>
                    <option value="szt.">szt.</option>
                    <option value="op.">op.</option>
                </select>
            </label><br/> */}
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
                    value={przedmiot.netto} 
                    onChange={changeItem} 
                    name="netto"
                    disabled={przedmiot.selected_price==="netto_selected" ? false : true} />
            </label><br/>
            <label>
                Cena brutto: &nbsp;
                <input 
                    type="number" 
                    value={przedmiot.brutto} 
                    onChange={changeItem} 
                    name="brutto"
                    disabled={przedmiot.selected_price==="brutto_selected" ? false : true} />
            </label><br/>
            <label>
                Stawka VAT: &nbsp;
                <select value={przedmiot.vat} onChange={changeItem} name="vat">
                    <option value="">wybierz</option>
                    <option value="23">23%</option>
                    <option value="8">8%</option>
                    <option value="5">5%</option>
                    <option value="0">0%</option>
                </select>
            </label>
        </div>
    )
}

export default NewItem;