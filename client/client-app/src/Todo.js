import React, { useState } from 'react';
import './Todo.css'

export default function Todo(props) {
    const [description, setDescription] = useState(props.state.description);
    const [isComplete, setIsComplete] = useState(props.state.state === "COMPLETE");

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
            <a href="#">
                <label>Edit</label>
            </a>
            <label>/</label>
            <a href="#">
                <label>Delete</label>
            </a>
        </section>
    );
}