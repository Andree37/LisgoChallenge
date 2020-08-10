import { useContext } from 'react';
import { Store } from '../Store/Store'

export default function useAdminFunctions() {
    const { state, dispatch } = useContext(Store);

    async function getUsers() {
        let response = await fetch("http://localhost:3000/users", {
            headers: { 'Authorization': state.authToken }
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
        let objUser = JSON.stringify(newUser);
        let response = await fetch("http://localhost:3000/users", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': state.authToken
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