import { useContext } from 'react';
import { Store } from './Store'

export default function useAuthFunctions() {
    const { dispatch } = useContext(Store);

    function login(name, surname, password) {
        let objTodo = JSON.stringify({ name, surname, password });

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: objTodo
        })
            .then(res => res.json())
            .then((result) => {
                return dispatch({
                    type: 'LOGIN',
                    payload: result.token
                });
            });
    }

    return {
        login,
    }
}