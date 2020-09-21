import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { useDispatch, useSelector } from 'react-redux';
import { setInputs } from '../actions';

function Input({value, name, namePL, onChange}) {
    const [focusName, setFocusName] = useSpring(() => ({
        top: "36px", cursor: "text", color: "gray"
    }));
    const focusHandler = () => {
        setFocusName({
            top: "0px", 
            cursor: "default", 
            color: "black"
        });
    }
    const blurHandler = () => {
        setFocusName({
            top: (value.length > 0) ? "0px" : "30px", 
            cursor: "text", 
            color: "gray"
        });
    }
    return (
        <label>
            <animated.span style={focusName}>{namePL.toUpperCase()}</animated.span>
            <input 
                type="text" 
                value={value} 
                name={name} 
                onChange={onChange}
                onFocus={focusHandler}
                onBlur={blurHandler} 
            />
        </label>
    )
}

function Home() {
    const dispatch = useDispatch();
    const [values, setValues] = useState(useSelector(state => state.sprzedawca));
    const [errors, setErrors] = useState({});
    const progress = useSelector(state => state.progress);
    const dataInputs = [
        {inputName: "Nazwa firmy ", valueName: values.firma, name: "firma", error: errors.firma},
        {inputName: "Skrócona nazwa ", valueName: values.skrot, name: "skrot", error: errors.skrot},
        {inputName: "Nr faktury ", valueName: values.nr_faktury, name: "nr_faktury", error: errors.nr_faktury},
        {inputName: "Ulica ", valueName: values.ulica, name: "ulica", error: errors.ulica},
        {inputName: "nr domu/mieszkania ", valueName: values.nr, name: "nr", error: errors.nr},
        {inputName: "Miejscowość ", valueName: values.miejscowosc, name: "miejscowosc", error: errors.miejscowosc},
        {inputName: "kod ", valueName: values.kod, name: "kod", error: errors.kod},
        {inputName: "NIP ", valueName: values.nip, name: "nip", error: errors.nip},
        {inputName: "REGON ", valueName: values.regon, name: "regon", error: errors.regon},
        {inputName: "Telefon ", valueName: values.telefon, name: "telefon", error: errors.telefon},
    ];

    const changeHandler = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const data = {...values, [name]: value};
        setErrors({
            ...errors,
            [name]: value.length < 1 ? "uzupełnij" : ""
        })
        setValues(data);
        dispatch(setInputs({sprzedawca: data}));
    }
    const verification = () => {
        const verified = Object.values(errors).filter(error => error.length < 1);
        return verified.length < 10 ? false : true
    }
    const saveInputs = () => {
        setErrors({
            ...errors,
            kod: isNaN(Number(values.kod)) ? "nieprawidłowy kod" : values.kod.length!==5 ? "wymagane 5 cyfr" : "",
        })
        const p2 = {
            ...progress,
            p2: verification() ? true : false
        }
        const data = {
            ...values,
            skrót: values.skrot.toUpperCase(),
            kod: (values.kod.length===5 && !isNaN(Number(values.kod))) ? `${values.kod.slice(0, 2)}-${values.kod.slice(2)}` : "",
            nip: `${values.nip.slice(0,3)}-${values.nip.slice(3, 6)}-${values.nip.slice(6, 8)}-${values.nip.slice(8)}`,
            telefon: `${values.telefon.slice(0, 2)} ${values.telefon.slice(2, 5)}-${values.telefon.slice(5, 7)}-${values.telefon.slice(7)}` 
        }
        dispatch(setInputs({progress: p2, sprzedawca: data}));
    }

    return(
        <div className="sprzedawca">
            <h1>Sprzedawca</h1>
            {dataInputs.map((item, index) => (
                <div key={index}>
                    <Input 
                        type="text" 
                        value={item.valueName} 
                        name={item.name} 
                        namePL={item.inputName}
                        onChange={changeHandler} 
                    />
                    <span style={{color: "red"}}>
                        {item.error}
                    </span>
                </div>
            ))}
            <div>
                <button onClick={saveInputs} disabled={verification() ? false : true}> dalej </button>
            </div>
            <NavLink exact to="/pdf">Generate PDF</NavLink>
        </div>
    )
}


  export default Home;