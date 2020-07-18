import React, { useState, useContext, useEffect } from 'react';
import Todo from './Todo'
import './TodoList.css'
import { TodoContext } from './App'

export default function TodoList(props) {
    const store = useContext(TodoContext);

    const [newTaskName, setNewTaskName] = useState('');
    const [hideCompleted, setHideCompleted] = useState(false);
    const [listTodos, setListTodos] = useState([]);

    useEffect(() => {
        let arrTodos = store.todos.get;
        setListTodos(arrTodos.map(todo => {
            return <Todo state={todo} key={todo.s_id} />
        }));
    }, [store.todos.get]);

    function handleNewTaskName(e) {
        setNewTaskName(e.target.value);
    }

    function handleCreateTask(e) {
        store.todos.create(newTaskName);
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
            <label>Tasks</label>
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