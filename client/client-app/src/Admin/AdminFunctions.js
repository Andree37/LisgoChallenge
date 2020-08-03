import { useContext } from 'react';
import { Store } from '../Store/Store'

export default function useAdminFunctions() {
    const { state, dispatch } = useContext(Store);

    async function getUsers() {
        let response = await fetch("http://localhost:3000/users", {
            headers: { 'Authorization': state.authToken }
        });
        let data = await response.json();
        if (Array.isArray(data)) {
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

    return {
        getUsers,
    }
}