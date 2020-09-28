import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSpring, animated } from 'react-spring';
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
    const [itemAnim] = useSpring(() => ({
        from: {opacity: 0, transform: "scale(0)"},
        to: {opacity: 1, transform: "scale(1)"}
    }))

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
        const calcBrutto = selected==="Brutto" ? brutto : (netto + (netto * vat / 100)).toFixed(2);
        const calcNetto = selected==="Netto" ? netto : (brutto - (brutto * vat / 100)).toFixed(2);
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
        <animated.div className="przedmiot" style={itemAnim}>
            <div>{num + 1}</div>
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
            <div>
                <InputSelect 
                    name="selected_price"
                    namePL="Podaj cenę"
                    value={przedmiot.selected_price}
                    onChange={changeItem}
                    variables={["Netto", "Brutto"]}
                    num={num}
                    error=""
                />
            </div>
            <div>
                <Input 
                    type="number"
                    value={przedmiot.netto}
                    name="netto"
                    namePL="Cena netto"
                    onChange={changeItem}
                    error=""
                    disabled={przedmiot.selected_price==="Netto" ? false : true}
                />
            </div>
            <div>
                <Input 
                    type="number"
                    value={przedmiot.brutto}
                    name="brutto"
                    namePL="Cena brutto"
                    onChange={changeItem}
                    error=""
                    disabled={przedmiot.selected_price==="Brutto" ? false : true}
                />
            </div>
            <div>
                <InputSelect 
                    name="vat"
                    namePL="Stawka VAT"
                    value={przedmiot.vat}
                    onChange={changeItem}
                    variables={["23%", "8%", "5%", "0%"]}
                    num={num}
                    error=""
                />
            </div>
        </animated.div>
    )
}

export default NewItem;