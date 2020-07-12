import React, { useState } from 'react';

export default function Todo(props) {
    const [description, setDescription] = useState(props.state.description);
    const [isComplete, setIsComplete] = useState(props.state.state === "COMPLETE");
    let id = props.state.id;

    function handleDescriptionChange(e) {
        setDescription(e.target.description);
    }

    function handleIsCompleteChange(e) {
        setIsComplete(!isComplete);
    }

    let handleDeleteTodo = props.deleteTodo;

    return (
        <section>
            <input
                type="checkbox"
                checked={isComplete}
                onChange={handleIsCompleteChange}
            />
            <input
                type="text"
                value={description}
                onChange={handleDescriptionChange}
            />
            <a href="#">
                <label>Edit</label>
            </a>
            <label>/</label>
            <a href="#" onClick={() => handleDeleteTodo(id)}>
                <label>Delete</label>
            </a>
        </section>
    );
}