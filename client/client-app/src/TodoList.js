import React, { useState, useContext, useEffect, useMemo } from 'react';
import Todo from './Todo'
import './TodoList.css'
import { Store } from './Store'
import useTodoFunctions from './TodoFunctions'

export default function TodoList(props) {
    const { state } = useContext(Store);
    const todoFunctions = useTodoFunctions();

    const [newTaskName, setNewTaskName] = useState('');
    const [hideCompleted, setHideCompleted] = useState(false);
    const [listTodos, setListTodos] = useState([]);
    const [currentRepresentation, setCurrentRepresentation] = useState(0);
    const [order, setOrder] = useState('Date');

    // create memos for filter and order
    // list desc Todos
    const sortedDescTodos = useMemo(() => {
        let sortedList = createSortedListMemo((a, b) => (
            a.description < b.description ? -1 : a.description === b.description ? 0 : 1
        ), state.todos);
        if(hideCompleted) {
            return hideCompletedList(sortedList);
        }
        return sortedList;
    }, [state.todos, hideCompleted]);

    // list asc Todos
    const sortedAscTodos = useMemo(() => {
        let sortedList = createSortedListMemo((a, b) => (
            a.description < b.description ? 1 : a.description === b.description ? 0 : -1
        ), state.todos);
        if(hideCompleted) {
            return hideCompletedList(sortedList);
        }
        return sortedList;
    }, [state.todos, hideCompleted]);

    // list date_added Todos
    const sortedDateTodos = useMemo(() => {
        let sortedList = createSortedListMemo((a, b) => (
            Date.parse(a.date_added) - Date.parse(b.date_added)
        ), state.todos);
        if(hideCompleted) {
            return hideCompletedList(sortedList);
        }
        return sortedList;
    }, [state.todos, hideCompleted]);

    // wrapper function to filter out the incomplete todos
    function hideCompletedList(todoList) {
        return todoList.filter(todo => (todo.state === 'INCOMPLETE'));
    }

    useEffect(() => {
        // control the rotation of the sort
        let sortedArray = [sortedDateTodos, sortedDescTodos, sortedAscTodos]
        let orders = ['Date', 'A-Z', 'Z-A'];
        // represent the todos in defined order
        setOrder(orders[currentRepresentation]);
        // represent hidden with filter wrapper
        setListTodos(sortedArray[currentRepresentation]);
    }, [state.todos, currentRepresentation, hideCompleted, sortedDateTodos, sortedDescTodos, sortedAscTodos]);

    function handleToggleTodoList() {
        let representation = (currentRepresentation + 1) % 3
        setCurrentRepresentation(representation);
    }

    function handleNewTaskName(e) {
        setNewTaskName(e.target.value);
    }

    function handleCreateTask(e) {
        todoFunctions.create(newTaskName);

        // change back to default
        setNewTaskName("");
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
                onClick={() => handleToggleTodoList()}>
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
        </section>
    );
}

function createSortedListMemo(sortFunction, listToSort) {
    let arrTodos = listToSort.slice();
    arrTodos.sort(sortFunction);
    return arrTodos;
}