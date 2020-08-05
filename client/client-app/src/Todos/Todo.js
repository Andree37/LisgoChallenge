import React, { useState, useEffect, useRef } from 'react';
import './Todo.css';
import useTodoFunctions from './TodoFunctions'

export default function Todo(props) {
    const [description, setDescription] = useState(props.state.description);
    const [isComplete, setIsComplete] = useState(props.state.state === "COMPLETE");
    const acceptedDescription = props.state.description;

    const todoFunctions = useTodoFunctions();
    const descriptionInput = useRef(null);
    const timeout = useRef(null);

    useEffect(() => {
        descriptionInput.current.addEventListener('keyup', function (e) {
            clearTimeout(timeout.current);

            timeout.current = setTimeout(function () {
                autoSave();
            }, 1000);
        });
    });

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    async function handleIsCompleteChange(e) {
        setIsComplete(!isComplete);
        //change state
        let state = !isComplete ? "COMPLETE" : "INCOMPLETE";
        await todoFunctions.edit(props.state.id, { state });
    }

    //change the description of the todo when clicked on edit button
    async function changeDescription() {
        let success = await todoFunctions.edit(props.state.id, { description });
        if (success) {
            alert("Task Updated!");
        }
        else {
            // if something wrong happens, change description back to what it was
            setDescription(acceptedDescription);
            alert("Task cannot be updated, it's already completed");
        }
    }

    async function handleDelete() {
        await todoFunctions.delete(props.state.id)
    }

    async function autoSave() {
        let success = await todoFunctions.edit(props.state.id, { description });
        if (!success) {
            // if something wrong happens, change description back to what it was
            setDescription(acceptedDescription);
            alert("Task cannot be updated, it's already completed");
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
                ref={descriptionInput}
                className="tasks"
                type="text"
                value={description}
                onChange={handleDescriptionChange}
            />
            <button
                type="button"
                className="link-button"
                onClick={changeDescription}>
                Edit
            </button>
            <label>/</label>
            <button
                type="button"
                className="link-button"
                onClick={handleDelete}>
                Delete
            </button>
        </section>
    );
}