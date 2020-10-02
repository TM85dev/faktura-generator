import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setInputs, setItems } from '../actions/index';


function InputSelect({name, namePL, value, variables, error="", num=""}) {
    const dispatch = useDispatch();
    const dane = useSelector(state => state.dane);
    const przedmiot = useSelector(state => state.przedmioty[num]);
    const [toggle, setToggle] = useState(false);
    const inputRef = useRef();
    const [currentValue, setCurrentValue] = useState(value);
    const selectHandler = (event) => {
        const percentToNum = (value) => {
            const arr = value.split("%");
            return Number(arr[0]);
        }
        const target = event.target;
        const text = target.textContent.match(/%/) ? percentToNum(target.textContent) : target.textContent;
        const name = inputRef.current.name;
        setCurrentValue(text)
        if(typeof num === "number") {
            const selected = przedmiot.selected_price;
            const netto = parseFloat(przedmiot.netto);
            const brutto = parseFloat(przedmiot.brutto);
            const vat = parseFloat(text);
            const ilosc = parseFloat(przedmiot.ilosc);
            const calcBrutto = selected==="Brutto" ? brutto : (netto + (netto * vat / 100)).toFixed(2);
            const calcNetto = selected==="Netto" ? netto : (brutto - (brutto * vat / 100)).toFixed(2);
            const dataPrzedmiot = {
                ...przedmiot, 
                [name]: text,
                ilosc: isNaN(ilosc) ? "" : ilosc,
                netto: isNaN(calcNetto) ? "" : parseFloat(calcNetto),
                brutto: isNaN(calcBrutto) ? "" : parseFloat(calcBrutto),
                wartosc_netto: isNaN(calcNetto) ? "" : parseFloat(ilosc > 0 ? (ilosc * calcNetto) : calcNetto).toFixed(2),
                wartosc_brutto: isNaN(calcBrutto) ? "" : parseFloat(ilosc > 0 ? (ilosc * calcBrutto) : calcBrutto).toFixed(2)
            };
            dispatch(setItems({[num]: dataPrzedmiot}));
        } else {
            const termin = () => {
                const data = new Date(dane.data_wystawienia).getTime();
                const termin = new Date(dane.termin_zaplaty).getTime();
                const dni = (termin - data) / 86400000;
                return dni<=0 ? 0 : dni;
            }
            const dataDane = {
                ...dane, 
                [name]: text,
                wplacono: isNaN(dane.wplacono) ? "" : dane.wplacono,
                dni_do_zaplaty: (name==="zaplacono" && text==="tak") ? 0 : termin()
            };
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
                    value={currentValue}
                    onChange={selectHandler}
                    onClick={clickHandler}
                    name={name} 
                    autoComplete="off"
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