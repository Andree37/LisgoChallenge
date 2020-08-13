import { useContext } from 'react';
import { Store } from '../Store/Store'
import useLocalStorage from '../Store/LocalStorage';

export default function useAuthFunctions() {
    const { state, dispatch } = useContext(Store);
    const localStorage = useLocalStorage();

    async function login(name, surname, password) {
        let objTodo = JSON.stringify({ name, surname, password });

        let response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: objTodo
        });
        if (response.ok) {
            let data = await response.json();
            dispatch({
                type: 'LOGIN',
                payload: data.token
            });
            localStorage.setItem('authToken', data.token);
            return true;
        }
        else {
            return false;
        }
    }

    async function logout() {
        if (state.authToken) {
            await fetch('http://localhost:3000/logout', {
                method: 'POST',
                headers: { 'Authorization': state.authToken }
            });
            dispatch({
                type: 'LOGOUT'
            });
            return true;
        }
        else {
            return false;
        }
    }

    function isLogged() {
        return state.authToken !== null
    }

    return {
        login,
        logout,
        isLogged,
    }
}