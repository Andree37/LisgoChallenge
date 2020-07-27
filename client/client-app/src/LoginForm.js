import React, { useState, useContext } from 'react';
import useAuthFunctions from './AuthFunctions';
import { Store } from './Store'

export default function LoginForm(props) {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [password, setPassword] = useState("");

    const { state, dispatch } = useContext(Store);

    const authFunctions = useAuthFunctions();

    function handleNameChange (e) {
        setName(e.target.value);
    }

    function handleSurnameChange (e) {
        setSurname(e.target.value);
    }

    function handlePasswordChange (e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        
        authFunctions.login(name, surname, password);
        console.log(state);
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
    <input type="text" name="name" onChange={handleNameChange} />
            </label>
            <label>
                Surname:
    <input type="text" name="surname" onChange={handleSurnameChange} />
            </label>
            <label>
                Password:
    <input type="password" name="password" onChange={handlePasswordChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}