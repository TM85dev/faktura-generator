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
        const target = event.target;
        const text = target.textContent;
        const name = inputRef.current.name;
        const dataDane = {...dane, [name]: text};
        const dataPrzedmiot = {...przedmiot, [name]: text};
        if(typeof num === "number") {
            dispatch(setItems({[num]: dataPrzedmiot}));
        } else {
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
                    onChange={onChange}
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