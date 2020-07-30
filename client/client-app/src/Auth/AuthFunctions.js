import { useContext } from 'react';
import { Store } from '../Store/Store'

export default function useAuthFunctions() {
    const { state, dispatch } = useContext(Store);

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
        let data = await response.json();
        dispatch({
            type: 'LOGIN',
            payload: data.token
        });
        return data;
    }

    async function logout() {
        let response = undefined;
        if (state.authToken) {
            response = await fetch('http://localhost:3000/logout', {
                method: 'POST',
                headers: { 'Authorization': state.authToken }
            });
        }
        dispatch({
            type: 'LOGOUT'
        });
        return response;
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