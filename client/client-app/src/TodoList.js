import React, { useState } from 'react';
import Todo from './Todo'

export default function TodoList(props) {
    const todos = props.todo;

    const [newTaskName, setNewTaskName] = useState('');
    const [hideCompleted, setHideCompleted] = useState(false);
    const [listTodos, setListTodos] = useState(
        todos.map(todo => {
            return <Todo state={todo} key={todo.id} deleteTodo={deleteTodo} />
        })
    );

    function deleteTodo(id) {
        let newTodos = listTodos.filter(todo => {
            return Number(todo.key) !== id
        })
        // fix this with global memory, how?
        console.log(newTodos);
        setListTodos(newTodos);
    }

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
            <Todo state={newTask} key={newTask.id} deleteTodo={deleteTodo}/>
        )
        let allTodos = listTodos.slice();
        setListTodos(allTodos);
    }

    function handleHideCompleted(e) {
        setHideCompleted(!hideCompleted);
    }

    return (
        <section>
            <input
                type="text"
                value={newTaskName}
                onChange={handleNewTaskName}
            />
            <button onClick={handleCreateTask}>
                Create
            </button>
            <br />
            <div>
                {listTodos}
            </div>
            <span>
                <label>Hide completed</label>
                <input
                    type="checkbox"
                    value={hideCompleted}
                    onChange={handleHideCompleted}
                />
            </span>
        </section>
    );
}