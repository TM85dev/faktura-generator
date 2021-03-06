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
    ];
    const [itemAnim] = useSpring(() => ({
        from: {opacity: 0, transform: "scale(0)"},
        to: {opacity: 1, transform: "scale(1)"}
    }));
    const inputs = [
        {
            name: "jm",
            namePL: "J.m.",
            value: przedmiot.jm,
            variables: ["szt.", "op."],
        }, 
        {
            name: "selected_price",
            namePL: "Podaj cenę",
            value: przedmiot.selected_price,
            variables: ["Netto", "Brutto"],
        },
        {
            name: "vat",
            namePL: "Stawka VAT",
            value: przedmiot.vat,
            variables: ["23%", "8%", "5%", "0%"],
        },
        {
            type: "number",
            value: przedmiot.netto,
            name: "netto",
            namePL: "Cena netto",
            disabled: przedmiot.selected_price==="Netto" ? false : true
        },
        {
            type: "number",
            value: przedmiot.brutto,
            name: "brutto",
            namePL: "Cena brutto",
            disabled: przedmiot.selected_price==="Brutto" ? false : true,
        }
    ];

    const changeItem = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        const item = {
            ...przedmiot,
            [name]: value
        }
        const selected = item.selected_price;
        const netto = parseFloat(item.netto);
        const brutto = parseFloat(item.brutto);
        const vat = parseFloat(item.vat);
        const calcBrutto = selected==="Brutto" ? brutto : (netto + (netto * vat / 100)).toFixed(2);
        const calcNetto = selected==="Netto" ? netto : (brutto - (brutto * vat / 100)).toFixed(2);
        const ilosc = parseFloat(item.ilosc);
        const data = {
            ...item,
            [name]: value,
            vat: vat,
            ilosc: isNaN(ilosc) ? "" : ilosc,
            netto: isNaN(netto) ? "" : parseFloat(calcNetto),
            brutto: isNaN(brutto) ? "" : parseFloat(calcBrutto),
            wartosc_netto: isNaN(calcNetto) ? "" : (parseFloat(ilosc > 0 ? (ilosc * calcNetto) : calcNetto).toFixed(2)),
            wartosc_brutto: isNaN(calcBrutto) ? "" : (parseFloat(ilosc > 0 ? (ilosc * calcBrutto) : calcBrutto).toFixed(2))
        }
        dispatch(setItems({[num]: data}));
    }

    return (
        <animated.div className="przedmiot" style={itemAnim}>
            <div>{num + 1}</div>
            {dataInputs.map(item => (
                <div key={item.name}>
                    <Input 
                        type="text"
                        value={item.valueName}
                        name={item.name}
                        namePL={item.inputName.toUpperCase()}
                        onChange={changeItem}
                    />
                </div>
            ))}
            {inputs.map(item => (
                <div key={item.name}>
                    {item.variables ? 
                        <InputSelect 
                            name={item.name}
                            namePL={item.namePL}
                            value={item.value}
                            variables={item.variables}
                            onChange={changeItem}
                            num={num}
                        /> :
                        <Input 
                            type={item.type}
                            value={item.value}
                            name={item.name}
                            namePL={item.namePL}
                            onChange={changeItem}
                            disabled={item.disabled}
                        />
                    }
                </div>
            ))}
        </animated.div>
    )
}

export default NewItem;