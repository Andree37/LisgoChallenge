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
            if (localStorage.storageAvailable('localStorage')) {
                localStorage.setItem('authToken', data.token);
            }
            else {
                dispatch({
                    type: 'LOGIN',
                    payload: data.token
                });
            }
            return true;
        }
        else {
            return false;
        }
    }

    async function logout() {
        let storageToken = localStorage.getItem('authToken');
        if (state.authToken || storageToken) {
            let auth = state.authToken;
            if (storageToken) {
                auth = storageToken.data;
            }
            await fetch('http://localhost:3000/logout', {
                method: 'POST',
                headers: { 'Authorization': auth }
            });
            dispatch({
                type: 'LOGOUT'
            });
            localStorage.removeItem('authToken');
            return true;
        }
        else {
            return false;
        }
    }

    function isLogged() {
        return state.authToken || localStorage.getItem('authToken');
    }

    return {
        login,
        logout,
        isLogged,
    }
}