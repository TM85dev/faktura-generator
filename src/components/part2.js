import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInputs } from '../actions';

function Part2() {
    const dispatch = useDispatch();
    const [values, setValues] = useState(useSelector(state => state.klient));
    const dataInputs = [
        {inputName: "Klient: ", valueName: values.nazwa, typeName:"text", name: "nazwa"},
        {inputName: "Ulica: ", valueName: values.ulica, typeName:"text", name: "ulica"},
        {inputName: "nr ", valueName: values.nr, typeName:"number", name: "nr"},
        {inputName: "Miejscowość: ", valueName: values.miejscowosc, typeName:"text", name: "miejscowosc"},
        {inputName: "kod ", valueName: values.kod, typeName:"number", name: "kod"},
        {inputName: "Telefon: ", valueName: values.telefon, typeName:"number", name: "telefon"},
    ];
    const changeHandler = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const data = {...values, [name]: value};
        setValues(data);
        dispatch(setInputs({klient: data}));
    }
    const saveChanges = () => {
        const data = {
            ...values,
            kod: `${values.kod.slice(0, 2)}-${values.kod.slice(2)}`,
            telefon: `${values.telefon.slice(0, 2)} ${values.telefon.slice(2, 5)}-${values.telefon.slice(5, 7)}-${values.telefon.slice(7)}` 
        };
        dispatch(setInputs({klient: data}))
    }
    return(
        <div>
            <h1>Nabywca</h1>
            {dataInputs.map(item => (
                <div key={item.name}>
                    <label>
                        {item.inputName} 
                        <input value={item.valueName} onChange={changeHandler} name={item.name} />
                    </label>
                </div>
            ))}
            <div>
                <button onClick={saveChanges}>save</button>
            </div>
        </div>
    )
}

export default Part2;