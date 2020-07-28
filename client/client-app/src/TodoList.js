import React, { useState, useContext, useEffect, useMemo } from 'react';
import Todo from './Todo'
import './TodoList.css'
import { Store } from './Store'
import useTodoFunctions from './TodoFunctions'

export default function TodoList(props) {
    const { state, dispatch } = useContext(Store);
    const todoFunctions = useTodoFunctions();

    const [newTaskName, setNewTaskName] = useState('');
    const [hideCompleted, setHideCompleted] = useState(false);
    const [listTodos, setListTodos] = useState([]);
    const [currentRepresentation, setCurrentRepresentation] = useState(0);
    const [order, setOrder] = useState('Date');

    const sortedDescTodos = useMemo(() => {
        let arrTodos = state.todos.slice();
        arrTodos.sort((a, b) => {
            return a.description < b.description ? -1 : a.description === b.description ? 0 : 1;
        });
        return arrTodos;
    }, [state.todos]);

    const sortedAscTodos = useMemo(() => {
        let arrTodos = state.todos.slice();
        arrTodos.sort((a, b) => {
            return a.description < b.description ? 1 : a.description === b.description ? 0 : -1;
        });
        return arrTodos;
    }, [state.todos]);

    const sortedDateTodos = useMemo(() => {
        let arrTodos = state.todos.slice();
        arrTodos.sort((a, b) => {
            return Date.parse(a.date_added) - Date.parse(b.date_added);
        });
        return arrTodos;
    }, [state.todos]);

    // control the rotation of the sort
    let sortedArray = []
    sortedArray.push(sortedDateTodos, sortedDescTodos, sortedAscTodos);
    let orders = ['Date', 'A-Z', 'Z-A'];

    useEffect(() => {
        let arrTodos = state.todos.slice();
        if (Array.isArray(arrTodos)) {
            setListTodos(arrTodos.map(todo => {
                return <Todo state={todo} key={todo.s_id} />
            }));
        }
    }, [state.todos]);

    function toggleTodoList() {
        let representation = (currentRepresentation + 1) % 3
        setCurrentRepresentation(representation);

        setOrder(orders[representation]);

        dispatch({
            type: 'FETCH_TODO',
            payload: sortedArray[representation]
        });
    }

    function handleNewTaskName(e) {
        setNewTaskName(e.target.value);
    }

    function handleCreateTask(e) {
        todoFunctions.create(newTaskName);
    }

    function handleHideCompleted(e) {
        setHideCompleted(!hideCompleted);
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
                onClick={() => toggleTodoList()}>
                Tasks / {order}
            </button>
            <hr />
            <div>
                {listTodos}
            </div>
            <div className="complete">
                <label className="completeLabel">Hide completed</label>
                <input
                    className="checkboxInput"
                    type="checkbox"
                    defaultChecked={hideCompleted}
                    onChange={handleHideCompleted}
                />
            </div>
        </section>
    );
}