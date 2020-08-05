import React, { useState, useEffect, useContext } from 'react';
import { Store } from '../Store/Store';
import useAuthFunctions from '../Auth/AuthFunctions';
import { Redirect } from 'react-router-dom';
import '../Todos/Todo.css';

export default function AdminPage(props) {
    const { state } = useContext(Store);
    const [usersList, setUsersList] = useState([]);
    const [checkTodos, setCheckTodos] = useState([]);

    const authFunctions = useAuthFunctions();

    useEffect(() => {
        setUsersList(state.users);
    }, [state.users])

    async function handleLogout(e) {
        let success = await authFunctions.logout();
        if (success) {
            const { history } = props;
            history.push("/login");
        }
    }

    function listTodos(userID) {
        let userTodos = state.todos.filter(t => {
            return t.creator.id === userID
        });

        setCheckTodos(userTodos);
    }

    if (!authFunctions.isLogged()) {
        return <Redirect to="/login" />
    }

    return (
        <section>
            <h1>Click this button to Logout</h1>
            <button onClick={handleLogout}>Logout</button>
            <hr/>
            {usersList.map(user => {
                return (
                    <li key={user.s_id}>
                        <button onClick={() => listTodos(user.id)} className="link-button">{user.name}</button>
                    </li>)
            })}
            <h2>User's Todos below:</h2>
            {checkTodos.map(todo => {
                return (
                    <li key={todo.s_id}>
                        <input
                            className="tasks"
                            type="text"
                            value={todo.description}
                            readOnly="readonly"
                        />
                    </li>
                )
            })}
        </section>
    );
}