import React, { useState } from 'react';
import Todo from './Todo'
import './TodoList.css'

export default function TodoList(props) {
    const todos = props.todo;

    const [newTaskName, setNewTaskName] = useState('');
    const [hideCompleted, setHideCompleted] = useState(false);
    const [listTodos, setListTodos] = useState(
        todos.map(todo => {
            return <Todo state={todo} key={todo.id} />
        })
    );

    function handleNewTaskName(e) {
        setNewTaskName(e.target.value);
    }

    function handleCreateTask(e) {
        //do ajax call to insert

        let newTask = {
            description: newTaskName,
            state: 'INCOMPLETE',
            id: listTodos.length + 1
        }
        listTodos.push(
            <Todo state={newTask} key={newTask.id} />
        )
        let allTodos = listTodos.slice();
        setListTodos(allTodos);
    }

    function handleHideCompleted(e) {
        setHideCompleted(!hideCompleted);
    }

    return (
        <section class="container">
            <div class="header">
                <input
                    class="taskInput"
                    type="text"
                    value={newTaskName}
                    onChange={handleNewTaskName}
                    placeholder="Write new task here..."
                />
                <button
                    onClick={handleCreateTask}
                    class="btnInput">
                    Create
                </button>
            </div>
            <label>Tasks</label>
            <hr/>
            <div>
                {listTodos}
            </div>
            <div class="complete">
                <label class="completeLabel">Hide completed</label>
                <input
                    class="checkboxInput"
                    type="checkbox"
                    value={hideCompleted}
                    onChange={handleHideCompleted}
                />
            </div>
        </section>
    );
}