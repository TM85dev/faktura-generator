import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSpring, animated } from 'react-spring';
import { NavLink } from 'react-router-dom';
import { setInputs } from '../actions';
import Input from './input';

function Part2() {
    const dispatch = useDispatch();
    const [values, setValues] = useState(useSelector(state => state.klient));
    const [errors, setErrors] = useState(useSelector(state => state.klientErrors));
    const [activation, setActivation] = useState(false);
    const progress = useSelector(state => state.progress);
    const dataInputs = [
        {inputName: "Klient", valueName: values.nazwa, typeName:"text", name: "nazwa", error: errors.nazwa},
        {inputName: "Ulica", valueName: values.ulica, typeName:"text", name: "ulica", error: errors.ulica},
        {inputName: "nr", valueName: values.nr, typeName:"number", name: "nr", error: errors.nr},
        {inputName: "Miejscowość", valueName: values.miejscowosc, typeName:"text", name: "miejscowosc", error: errors.miejscowosc},
        {inputName: "kod", valueName: values.kod, typeName:"number", name: "kod", error: errors.kod},
        {inputName: "Telefon", valueName: values.telefon, typeName:"number", name: "telefon", error: errors.telefon},
    ];
    const [activeAnim] = useSpring(() => ({
        from: {opacity: 0, transform: "scale(0.7)"},
        to: {opacity: 1, transform: "scale(1)"}
    }));
    const changeHandler = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const data = {...values, [name]: value};
        const dataErrors = {...errors, [name]: value.length < 1 ? "uzupełnij" : ""};
        const activated = () => {
            const verif = Object.values(dataErrors).filter(errors => errors.length > 0);
            return verif.length===0 ? true : false;
        };
        setActivation(activated());
        setValues(data);
        setErrors(dataErrors);
        dispatch(setInputs({klientErrors: dataErrors, klient: data}));
    }
    const saveChanges = () => {
        const dataErrors = {
            nazwa: values.nazwa.length < 1 ? "uzupełnij" : "",
            ulica: values.ulica < 1 ? "uzupełnij" : "",
            nr: isNaN(Number(values.nr)) ? "nieprawidłowy numer" : values.nr.length < 1 ? "uzupełnij" : "",
            miejscowosc: values.miejscowosc.length < 1 ? "uzupełnij" : "",
            kod: isNaN(Number(values.kod)) ? "nieprawidłowy kod" : values.kod.length!==5 ? "wymagane 5 cyfr" : "",
            telefon: isNaN(Number(values.telefon)) ? "nieprawidłowy nr telefonu" : values.telefon.length!==9 ? "wymagane 9 cyfr" : ""
        };
        const data = {
            ...values,
            nr: !isNaN(Number(values.nr)) ? values.nr : "",
            kod: (!isNaN(Number(values.kod)) && values.kod.length===5) ? `${values.kod.slice(0, 2)}-${values.kod.slice(2)}` : "",
            telefon: (!isNaN(Number(values.telefon)) && values.telefon.length===9) ? `${values.telefon.slice(0, 2)} ${values.telefon.slice(2, 5)}-${values.telefon.slice(5, 7)}-${values.telefon.slice(7)}` : ""  
        };
        const verification = () => {
            const verif = Object.values(dataErrors).filter(errors => errors.length > 0);
            return verif.length===0 ? true : false;
        };
        const dataProgress = {...progress, p2: verification()};
        setActivation(verification());
        setErrors(dataErrors);
        dispatch(setInputs({progress: dataProgress, klientErrors: dataErrors, klient: data}))
    }
    return(
        <animated.div className="klient" style={activeAnim}>
            <h1>Nabywca</h1>
            {dataInputs.map(item => (
                <div key={item.name}>
                    <Input 
                        type="text"
                        value={item.valueName}
                        name={item.name}
                        namePL={item.inputName.toUpperCase()}
                        onChange={changeHandler}
                        error={item.error}
                    />
                </div>
            ))}
            <div className="navigation">
                <button onClick={saveChanges} disabled={!activation}> zapisz </button>
                <NavLink exact to="/part3" className={progress.p2 ? "" : "disabled"}>dalej</NavLink>
            </div>
        </animated.div>
    )
}

export default Part2;