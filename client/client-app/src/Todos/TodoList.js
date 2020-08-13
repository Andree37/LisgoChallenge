import React, { useState, useContext, useEffect, useMemo } from 'react';
import Todo from './Todo'
import './TodoList.css'
import { Store } from '../Store/Store'
import useTodoFunctions from './TodoFunctions'
import useAuthFunctions from '../Auth/AuthFunctions';
import { Redirect } from 'react-router-dom';

export default function TodoList(props) {
    const { state } = useContext(Store);
    const todoFunctions = useTodoFunctions();

    const [newTaskName, setNewTaskName] = useState('');
    const [hideCompleted, setHideCompleted] = useState(false);
    const [listTodos, setListTodos] = useState([]);
    const [currentRepresentation, setCurrentRepresentation] = useState(0);
    const [order, setOrder] = useState('Date');
    const authFunctions = useAuthFunctions();

    // create memos for filter and order
    // list desc Todos
    const sortedDescTodos = useMemo(() => {
        return createSortedListMemo((a, b) => (
            a.description < b.description ? -1 : a.description === b.description ? 0 : 1
        ), state.todos, hideCompleted);
    }, [state.todos, hideCompleted]);

    // list asc Todos
    const sortedAscTodos = useMemo(() => {
        return createSortedListMemo((a, b) => (
            a.description < b.description ? 1 : a.description === b.description ? 0 : -1
        ), state.todos, hideCompleted);
    }, [state.todos, hideCompleted]);

    // list date_added Todos
    const sortedDateTodos = useMemo(() => {
        return createSortedListMemo((a, b) => (
            Date.parse(a.date_added) - Date.parse(b.date_added)
        ), state.todos, hideCompleted);
    }, [state.todos, hideCompleted]);

    useEffect(() => {
        // control the rotation of the sort
        let sortedArray = [sortedDateTodos, sortedDescTodos, sortedAscTodos]
        let orders = ['Date', 'A-Z', 'Z-A'];
        // represent the todos in defined order
        setOrder(orders[currentRepresentation]);
        // represent hidden with filter wrapper
        if(state.todos) {
            setListTodos(sortedArray[currentRepresentation]);
        }   
    }, [state.todos, currentRepresentation, hideCompleted, sortedDateTodos, sortedDescTodos, sortedAscTodos, todoFunctions]);

    function handleToggleTodoList() {
        let representation = (currentRepresentation + 1) % 3
        setCurrentRepresentation(representation);
    }

    function handleNewTaskName(e) {
        setNewTaskName(e.target.value);
    }

    async function handleCreateTask(e) {
        await todoFunctions.create(newTaskName);

        // change back to default
        setNewTaskName("");
    }

    function handleHideCompleted(e) {
        setHideCompleted(!hideCompleted);
    }

    async function handleLogout(e) {
        let success = await authFunctions.logout();
        if (success) {
            const { history } = props;
            history.push("/login");
        }
    }

    function adminPage() {
        const { history } = props;
        history.push("/admin");
    }

    if (!authFunctions.isLogged()) {
        return <Redirect to="/login" />
    }
    if (state.users && state.users.length !== 0) {
        return <Redirect to="/admin" />
    }
    
    return (
        <section className="container">
            <div className="header">
                <input
                    className="taskInput"
                    type="text"
                    value={newTaskName}
                    onChange={handleNewTaskName}
                    placeholder="Write new task here..."
                />
                <button
                    onClick={handleCreateTask}
                    className="btnInput">
                    Create
                </button>
            </div>
            <button
                type="button"
                className="link-button"
                onClick={handleToggleTodoList}>
                Tasks / {order}
            </button>
            <hr />
            <div>
                {listTodos.map(todo => {
                    return <Todo state={todo} key={todo.s_id} />
                })}
            </div>
            <div className="complete">
                <label className="completeLabel">Hide completed</label>
                <input
                    className="checkboxInput"
                    type="checkbox"
                    checked={hideCompleted}
                    onChange={handleHideCompleted}
                />
            </div>
            <button onClick={handleLogout}>LOG OUT</button>
            {state.users && state.users.length !== 0 ? <button onClick={adminPage}>ADMIN</button> : <div></div>}
        </section>
    );
}

// create memo list with filter
function createSortedListMemo(sortFunction, listToSort, hideCompleted) {
    if(!listToSort) return;
    let arrTodos = listToSort.slice();
    arrTodos.sort(sortFunction);
    return hideCompleted ? hideCompletedList(arrTodos) : arrTodos;
}

// wrapper function to filter out the incomplete todos
function hideCompletedList(todoList) {
    return todoList.filter(todo => (todo.state === 'INCOMPLETE'));
}