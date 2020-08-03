import React, { useState, useEffect, useContext } from 'react';
import useAdminFunctions from './AdminFunctions';
import { Store } from '../Store/Store';

export default function AdminPage(props) {
    const { state } = useContext(Store);
    const [usersList, setUsersList] = useState([]);

    const adminFunctions = useAdminFunctions();

    useEffect(() => {
        async function a() {
            //load users
            let success = await adminFunctions.getUsers();
            console.log(success);
            if (success) {
                setUsersList(state.users);
            }
        }
        a();
    }, [])

    return (
        <section>
            <h1>Yo</h1>
            {usersList.map(user => {
                return <h2>{user.name}</h2>
            })}
        </section>
    );
}