import React, { useState } from 'react';
import './Todo.css';
import useTodoFunctions from './TodoFunctions'

export default function Todo(props) {
    const [description, setDescription] = useState(props.state.description);
    const [isComplete, setIsComplete] = useState(props.state.state === "COMPLETE");

    const todoFunctions = useTodoFunctions();

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleIsCompleteChange(e) {
        setIsComplete(!isComplete);
        //change state
        let state = !isComplete ? "COMPLETE" : "INCOMPLETE";
        todoFunctions.edit(props.state.id, { state });
    }

    function changeDescription() {
        if(!isComplete) {
            todoFunctions.edit(props.state.id, { description });
        }
        else {
            alert("Cannot change description of a completed task, remove completion first")
        }
        
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
                onClick={() => changeDescription()}>
                Edit
            </button>
            <label>/</label>
            <button
                type="button"
                className="link-button"
                onClick={() => todoFunctions.delete(props.state.id)}>
                Delete
            </button>
        </section>
    );
}