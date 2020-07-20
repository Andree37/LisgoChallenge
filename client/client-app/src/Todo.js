import React, { useState, useContext } from 'react';
import './Todo.css';
import { Store } from './Store';

export default function Todo(props) {
    const [description, setDescription] = useState(props.state.description);
    const [isComplete, setIsComplete] = useState(props.state.state === "COMPLETE");

    const { state, dispatch } = useContext(Store);

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleIsCompleteChange(e) {
        setIsComplete(!isComplete);
        //editTodo(props.state.id);
    }

    async function deleteTodo(id) {
        fetch(`http://localhost:3000/todos/${id}`, { method: 'DELETE'})
            .then(res => {
                if (res.ok) {
                    let newTodos = state.todos.filter(t => {
                        return t.id !== id;
                    })
                    return dispatch({
                        type: 'DELETE_TODO',
                        payload: newTodos
                    });
                } else {
                    console.log("Did not delete");
                }
            })
    }
    
    async function editTodo(id, changes) {
        let objTodo = JSON.stringify(changes);
        fetch(`http://localhost:3000/todos/${id}`, {
            method: 'PATCH',
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
                            // probably a better way of doing this, making it O(1) need to think more, maybe getting it from the key on the array?
                            state.todos.forEach(t => {
                                if (t.id === id) {
                                    t.description = result.description;
                                }
                            });
                            alert('You changed the description to: ' + result.description);
                        })
                }
            });
    }

    return (
        <section className="line">
            <input
                className="checkboxInput"
                type="checkbox"
                checked={isComplete}
                onChange={handleIsCompleteChange}
            />
            <input
                className="tasks"
                type="text"
                value={description}
                onChange={handleDescriptionChange}
            />
            <button
                type="button"
                className="link-button"
                onClick={() => editTodo(props.state.id, { description })}>
                Edit
            </button>
            <label>/</label>
            <button
                type="button"
                className="link-button"
                onClick={() => deleteTodo(props.state.id)}>
                Delete
            </button>
        </section>
    );
}