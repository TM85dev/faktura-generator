import React, { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

function Input({value, name, namePL, type, onChange, error, disabled=false}) {
    const [focusName, setFocusName] = useSpring(() => ({
        top: value.length===0 && type!=="date" && disabled===false ? "38px" : "-2px", cursor: "text", color: "gray"
    }));
    const [focusInput, setFocusInput] = useSpring(() => ({
        boxShadow: "0 0 2px 0px silver"
    }));
    const changeHandler = (e) => {
        onChange(e);
    }
    const focusHandler = () => {
        setFocusName({
            top: "-2px", 
            cursor: "default", 
            color: "black"
        });
        setFocusInput({
            boxShadow: error.length===0 ? "0 0 4px 1px green" : "0 0 4px 1px red"
        });
    }
    const blurHandler = () => {
        setFocusName({
            top: (value.length!==0 || type==="date") ? "-2px" : "38px", 
            cursor: "text", 
            color: "gray"
        });
        setFocusInput({
            boxShadow: error.length===0 ? "0 0 2px 0px silver" : "0 0 2px 0px red"
        });
    }
    const pressHandler = () => {
        setFocusInput({
            boxShadow: error.length===0 ? "0 0 2px 0px silver" : "0 0 2px 0px red"
        });
    };
    useEffect(() => {
        setFocusInput({
            boxShadow: error.length===0 ? "0 0 2px 0px silver" : "0 0 2px 0px red"
        });
    }, [setFocusInput, error])
    return (
        <>
        <label>
            <animated.span style={focusName}>{namePL.toUpperCase()}</animated.span>
            <animated.input
                style={focusInput} 
                type={type} 
                value={value} 
                name={name} 
                onChange={changeHandler}
                onKeyUp={pressHandler}
                onFocus={focusHandler}
                onBlur={blurHandler} 
                disabled={disabled}
            />
        </label>
        <span style={{color: "red"}}>
            {error}
        </span>
        </>
    )
}

export default Input;