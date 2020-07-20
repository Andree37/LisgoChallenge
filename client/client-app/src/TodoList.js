import React, { useState, useContext, useEffect } from 'react';
import Todo from './Todo'
import './TodoList.css'
import { Store } from './Store'

export default function TodoList(props) {
    const { state, dispatch } = useContext(Store);

    const [newTaskName, setNewTaskName] = useState('');
    const [hideCompleted, setHideCompleted] = useState(false);
    const [listTodos, setListTodos] = useState([]);

    useEffect(() => {
        let arrTodos = state.todos;
        setListTodos(arrTodos.map(todo => {
            return <Todo state={todo} key={todo.s_id} />
        }));
    }, [state.todos]);

    function handleNewTaskName(e) {
        setNewTaskName(e.target.value);
    }

    function handleCreateTask(e) {
        createTodo(newTaskName);
    }

    function handleHideCompleted(e) {
        setHideCompleted(!hideCompleted);
    }

    async function createTodo(description) {
        let objTodo = JSON.stringify({
            description: description
        });
        fetch('http://localhost:3000/todos', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: objTodo
        })
            .then(res => {
                if (res.ok) {
                    res.json()
                        .then(result => {
                            return dispatch({
                                type: 'ADD_TODO',
                                payload: result
                            });
                        });
                } else {
                    console.log("Did not create");
                }
            })
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