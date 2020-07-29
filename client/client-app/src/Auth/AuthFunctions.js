import { useContext } from 'react';
import { Store } from '../Store/Store'

export default function useAuthFunctions() {
    const { dispatch } = useContext(Store);

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

    return {
        login,
    }
}