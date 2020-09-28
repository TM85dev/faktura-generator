import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInputs, setItems } from '../actions/index';


function InputSelect({name, namePL, value, onChange, variables, error, num=""}) {
    const dispatch = useDispatch();
    const dane = useSelector(state => state.dane);
    const przedmiot = useSelector(state => state.przedmioty[num]);
    const [toggle, setToggle] = useState(false);
    const inputRef = useRef();
    const selectHandler = (event) => {
        const percentToNum = (value) => {
            const arr = value.split("%");
            return Number(arr[0]);
        }
        const target = event.target;
        const text = target.textContent.match(/%/) ? percentToNum(target.textContent) : target.textContent;
        const name = inputRef.current.name;
        if(typeof num === "number") {
            const selected = przedmiot.selected_price;
            const netto = Number(przedmiot.netto);
            const brutto = Number(przedmiot.brutto);
            const vat = Number(text);
            const ilosc = Number(przedmiot.ilosc);
            const calcBrutto = selected==="Brutto" ? brutto : (netto + (netto * vat / 100)).toFixed(2);
            const calcNetto = selected==="Netto" ? netto : (brutto - (brutto * vat / 100)).toFixed(2);
            const dataPrzedmiot = {
                ...przedmiot, 
                [name]: text,
                ilosc: isNaN(ilosc) ? "" : ilosc,
                netto: Number(calcNetto),
                brutto: Number(calcBrutto),
                wartosc_netto: Number(ilosc > 0 ? (ilosc * calcNetto) : calcNetto).toFixed(2),
                wartosc_brutto: Number(ilosc > 0 ? (ilosc * calcBrutto) : calcBrutto).toFixed(2)
            };
            dispatch(setItems({[num]: dataPrzedmiot}));
        } else {
            const dataDane = {...dane, [name]: text};
            dispatch(setInputs({dane: dataDane}));
        }
    };
    const clickHandler = () => {
        setToggle(true);
    }
    const leaveHandler = () => {
        setToggle(false);
    }
    return (
        <>
            <label>
                <span>{namePL}</span>
                <span className="arrow">&#11167;</span>
                <input
                    ref={inputRef}
                    value={value}
                    onChange={selectHandler}
                    onClick={clickHandler}
                    name={name} 
                />
                <div style={{display: toggle ? "" : "none"}} onMouseLeave={leaveHandler}>
                    {variables.map(item => (
                        <span key={item} onClick={selectHandler}>{item}</span>
                    ))}
                </div>
            </label>
            <span style={{color: "red"}}>
                {error}
            </span>
        </>
    )
}

export default InputSelect;