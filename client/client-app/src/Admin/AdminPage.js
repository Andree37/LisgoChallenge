import React, { useState, useEffect, useContext } from 'react';
import { Store } from '../Store/Store';
import useAuthFunctions from '../Auth/AuthFunctions';
import { Redirect } from 'react-router-dom';
import '../Todos/Todo.css';
import useAdminFunctions from './AdminFunctions';
import useTodoFunctions from '../Todos/TodoFunctions';

export default function AdminPage(props) {
    const { state } = useContext(Store);
    const [usersList, setUsersList] = useState([]);
    const [checkTodos, setCheckTodos] = useState([]);
    const [newUserName, setNewUserName] = useState("");
    const [newUserSurname, setNewUserSurname] = useState("");
    const [newUserPassword, setNewUserPassword] = useState("");
    const [newUserRole, setNewUserRole] = useState("normal");

    const authFunctions = useAuthFunctions();
    const adminFunctions = useAdminFunctions();
    const todoFunctions = useTodoFunctions();

    useEffect(() => {
        setUsersList(state.users);
        todoFunctions.getAll();
    }, [state.users, todoFunctions])

    async function handleLogout(e) {
        let success = await authFunctions.logout();
        if (success) {
            const { history } = props;
            history.push("/login");
        }
    }

    function listTodos(userID) {
        let userTodos = state.allTodos.filter(t => {
            return t.creator.id === userID
        });

        setCheckTodos(userTodos);
    }

    function handleNewUserNameChange(e) {
        setNewUserName(e.target.value);
    }

    function handleNewUserSurnameChange(e) {
        setNewUserSurname(e.target.value);
    }

    function handleNewUserPasswordChange(e) {
        setNewUserPassword(e.target.value);
    }

    function handleNewUserRole(e) {
        setNewUserRole(e.target.value);
    }

    async function handleSubmitForm(e) {
        let user = {
            name: newUserName,
            surname: newUserSurname,
            password: newUserPassword,
            role: newUserRole
        }
        let success = await adminFunctions.createUser(user);

        if (!success) {
            alert("User must have a first and last name, and the password must be at least 3 characters long");
        }
        else {
            // Reset input on success
            setNewUserName("");
            setNewUserSurname("");
            setNewUserPassword("");
            setNewUserRole("normal");

            alert("Created a new User!");
        }
    }

    async function handleBack() {
        const { history } = props;
        history.push("/");
    }

    if (!authFunctions.isLogged()) {
        return <Redirect to="/login" />
    }

    return (
        <section>
            <h1>Click this button to go back</h1>
            <button onClick={handleBack}>Go Back</button>
            <h1>Click this button to Logout</h1>
            <button onClick={handleLogout}>Logout</button>
            <hr />
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
            <hr />
            <h2>Create a new User below:</h2>
            <div>
                <label>Name:
                    <input type="text" value={newUserName} onChange={handleNewUserNameChange} />
                </label>
                <label>Surname:
                    <input type="text" value={newUserSurname} onChange={handleNewUserSurnameChange} />
                </label>
                <label>Password:
                    <input type="password" value={newUserPassword} onChange={handleNewUserPasswordChange} />
                </label>
                <select value={newUserRole} onChange={handleNewUserRole}>
                    <option value="normal">Normal</option>
                    <option value="admin">Admin</option>
                </select>
                <button onClick={handleSubmitForm}>Submit</button>
            </div>
        </section>
    );
}