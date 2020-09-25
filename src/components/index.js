import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { useDispatch, useSelector } from 'react-redux';
import { setInputs } from '../actions';
import Input from './input';


function Home() {
    const dispatch = useDispatch();
    const [values, setValues] = useState(useSelector(state => state.sprzedawca));
    const [errors, setErrors] = useState(useSelector(state => state.sprzedawcaErrors));
    const [activation, setActivation] = useState(false);
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
        }
        setActivation(activated());
        setErrors(dataErrors);
        setValues(data);
        dispatch(setInputs({sprzedawcaErrors: dataErrors, sprzedawca: data}));
    }

    const saveInputs = () => {
        const dataErrors = {
            firma: values.firma.length < 1 ? "uzupełnij" : "",
            skrot: values.skrot.length < 1 ? "uzupełnij" : "",
            nr_faktury: values.nr_faktury.length < 1 ? "uzupełnij" : "",
            ulica: values.ulica < 1 ? "uzupełnij" : "",
            nr: isNaN(Number(values.nr)) ? "nieprawidłowy numer" : values.nr.length < 1 ? "uzupełnij" : "",
            kod: isNaN(Number(values.kod)) ? "nieprawidłowy kod" : values.kod.length!==5 ? "wymagane 5 cyfr" : "",
            miejscowosc: values.miejscowosc.length < 1 ? "uzupełnij" : "",
            nip: isNaN(Number(values.nip)) ? "nieprawidłowy nr NIP" : values.nip.length!==10 ? "wymagane 10 cyfr" : "",
            regon: isNaN(Number(values.regon)) ? "nieprawidłowy nr REGON" : (values.regon.length!==9 && values.regon.length!==14) ? "wymagane 9 lub 14 cyfr" : "",
            telefon: isNaN(Number(values.telefon)) ? "nieprawidłowy nr telefonu" : values.telefon.length!==9 ? "wymagane 9 cyfr" : ""
        };
        const data = {
            ...values,
            skrot: values.skrot.toUpperCase(),
            nr: !isNaN(Number(values.nr)) ? values.nr : "",
            kod: (!isNaN(Number(values.kod)) && values.kod.length===5) ? `${values.kod.slice(0, 2)}-${values.kod.slice(2)}` : "",
            nip: (!isNaN(Number(values.nip)) && values.nip.length===10) ? `${values.nip.slice(0,3)}-${values.nip.slice(3, 6)}-${values.nip.slice(6, 8)}-${values.nip.slice(8)}` : "",
            regon: (!isNaN(Number(values.regon)) && (values.regon.length===9 || values.regon.length===14)) ? values.regon : "",
            telefon: (!isNaN(Number(values.telefon)) && values.telefon.length===9) ? `${values.telefon.slice(0, 2)} ${values.telefon.slice(2, 5)}-${values.telefon.slice(5, 7)}-${values.telefon.slice(7)}` : "" 
        }
        const verification = () => {
            const verif = Object.values(dataErrors).filter(errors => errors.length > 0);
            return verif.length===0 ? true : false;
        };
        const dataProgress = {...progress, p1: verification()};
        setActivation(verification());
        setErrors(dataErrors);
        dispatch(setInputs({progress: dataProgress, sprzedawcaErrors: dataErrors, sprzedawca: data}));
    }

    return(
        <animated.div className="sprzedawca" style={activeAnim}>
            <h1>Sprzedawca</h1>
            {dataInputs.map((item, index) => (
                <div key={index}>
                    <Input 
                        type="text" 
                        value={item.valueName} 
                        name={item.name} 
                        namePL={item.inputName}
                        onChange={changeHandler} 
                        error={item.error}
                    />
                </div>
            ))}
            <div className="navigation">
                <button onClick={saveInputs} disabled={!activation}> zapisz </button>
                <NavLink exact to="/part2" className={progress.p1 ? "" : "disabled"}>dalej</NavLink>
            </div>
            <NavLink exact to="/pdf">Generate PDF</NavLink>
        </animated.div>
    )
}


  export default Home;