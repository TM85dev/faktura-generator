import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setInputs } from '../actions'


function Home() {
    const dispatch = useDispatch();
    const [values, setValues] = useState(useSelector(state => state.sprzedawca));
    const dataInputs = [
        {inputName: "Nazwa firmy: ", valueName: values.firma, typeName:"text", name: "firma"},
        {inputName: "Skrócona nazwa: ", valueName: values.skrot, typeName:"text", name: "skrot"},
        {inputName: "Nr faktury: ", valueName: values.nr_faktury, typeName:"number", name: "nr_faktury"},
        {inputName: "Ulica: ", valueName: values.ulica, typeName:"text", name: "ulica"},
        {inputName: "nr ", valueName: values.nr, typeName:"number", name: "nr"},
        {inputName: "Miejscowość: ", valueName: values.miejscowosc, name: "miejscowosc"},
        {inputName: "kod ", valueName: values.kod, typeName:"number", name: "kod"},
        {inputName: "NIP ", valueName: values.nip, typeName:"number", name: "nip"},
        {inputName: "REGON ", valueName: values.regon, typeName:"number", name: "regon"},
        {inputName: "Telefon ", valueName: values.telefon, typeName:"number", name: "telefon"},
    ]
    const changeHandler = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const data = {...values, [name]: value};
        setValues(data);
        dispatch(setInputs({sprzedawca: data}));
    }
    const saveInputs = () => {
        const data = {
            ...values,
            skrót: values.skrot.toUpperCase(),
            kod: `${values.kod.slice(0, 2)}-${values.kod.slice(2)}`,
            nip: `${values.nip.slice(0,3)}-${values.nip.slice(3, 6)}-${values.nip.slice(6, 8)}-${values.nip.slice(8)}`,
            telefon: `${values.telefon.slice(0, 2)} ${values.telefon.slice(2, 5)}-${values.telefon.slice(5, 7)}-${values.telefon.slice(7)}` 
        }
        dispatch(setInputs({sprzedawca: data}));
    }
    return(
        <div>
            <h1>Sprzedawca</h1>
            {dataInputs.map(item => (
                <div key={item.name}>
                    <label>
                        {item.inputName}
                        <input 
                            type={item.typeName} 
                            value={item.valueName} 
                            name={item.name} 
                            onChange={changeHandler} />
                    </label>
                </div>
            ))}
            <div>
                <button onClick={saveInputs}> save </button>
            </div>
            <NavLink exact to="/pdf">Generate PDF</NavLink>
        </div>
    )
}


  export default Home;