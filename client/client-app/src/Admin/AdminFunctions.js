import { useContext } from 'react';
import { Store } from '../Store/Store'
import useLocalStorage from '../Store/LocalStorage';

export default function useAdminFunctions() {
    const { state, dispatch } = useContext(Store);
    const localStorage = useLocalStorage();

    async function getUsers() {
        let storageToken = localStorage.getItem('authToken');
        let auth = state.authToken;
        if (storageToken) {
            auth = storageToken.data;
        }
        let response = await fetch("http://localhost:3000/users", {
            headers: { 'Authorization': auth }
        });
        let data = await response.json();
        if (Array.isArray(data) && response.ok) {
            dispatch({
                type: 'FETCH_USERS',
                payload: data
            });
            return true;
        }
        else {
            return false;
        }
    }

    async function createUser(newUser) {
        let storageToken = localStorage.getItem('authToken');
        let auth = state.authToken;
        if (storageToken) {
            auth = storageToken.data;
        }
        let objUser = JSON.stringify(newUser);
        let response = await fetch("http://localhost:3000/users", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': auth
            },
            body: objUser
        });
        if (response.ok) {
            let data = await response.json();
            console.log(data)
            dispatch({
                type: 'ADD_USER',
                payload: data
            });
            return true;
        }
        return false;
    }

    return {
        getUsers,
        createUser,
    }
}