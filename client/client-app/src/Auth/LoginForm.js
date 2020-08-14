import React, { useState } from 'react';
import useAuthFunctions from './AuthFunctions';
import './LoginForm.css';

export default function LoginForm(props) {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [password, setPassword] = useState("");

    const authFunctions = useAuthFunctions();
    

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleSurnameChange(e) {
        setSurname(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    async function handleSubmit(e) {
        const { history } = props;
        e.preventDefault();
        try {
            let success = await authFunctions.login(name, surname, password);

            // user is authenticated with the token
            if (success) {
                history.push('/');
                window.location.reload(false);
            }
            else {
                alert("Something went wrong...")
            }
        }
        catch (err) {
            alert("User or password is incorrect...")
        }
    }

    return (
        <div className="login-page">
            <div className="form">
                <form className="login-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="name" onChange={handleNameChange} value={name} required />
                    <input type="text" placeholder="surname" onChange={handleSurnameChange} value={surname} required />
                    <input type="password" placeholder="password" onChange={handlePasswordChange} value={password} required />
                    <input className="submit" type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
}