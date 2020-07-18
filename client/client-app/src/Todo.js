import React, { useState, useContext } from 'react';
import './Todo.css'
import { TodoContext } from './App'

export default function Todo(props) {
    const [description, setDescription] = useState(props.state.description);
    const [isComplete, setIsComplete] = useState(props.state.state === "COMPLETE");
    const store = useContext(TodoContext);

    function handleDescriptionChange(e) {
        setDescription(e.target.description);
    }

    function handleIsCompleteChange(e) {
        setIsComplete(!isComplete);
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
                className="link-button">
                Edit
            </button>
            <label>/</label>
            <button
                type="button"
                className="link-button"
                onClick={() => store.todos.delete(props.state.id)}>
                Delete
            </button>
        </section>
    );
}