import { useContext } from 'react';
import { Store } from '../Store/Store'

export default function useTodoFunctions() {
    const { state, dispatch } = useContext(Store);

    async function getTodos() {
        let response = await fetch("http://localhost:3000/todos?orderBy=DATE_ADDED", {
            headers: { 'Authorization': state.authToken }
        });
        let data = await response.json();
        if (Array.isArray(data)) {
            dispatch({
                type: 'FETCH_TODO',
                payload: data
            });
            return true;
        }
        else {
            return false;
        }
    }

    async function deleteTodo(id) {
        let response = await fetch(`http://localhost:3000/todos/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': state.authToken }
        });
        if (response.ok) {
            let newTodos = state.todos.filter(t => {
                return t.id !== id;
            })
            dispatch({
                type: 'DELETE_TODO',
                payload: newTodos
            });
            return true;
        } else {
            return false;
        }
    }

    async function editTodo(id, changes) {
        let objTodo = JSON.stringify(changes);
        let response = await fetch(`http://localhost:3000/todos/${id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': state.authToken
            },
            body: objTodo
        });
        if (response.ok) {
            let data = await response.json();
            // probably a better way of doing this, making it O(1) need to think more, maybe getting it from the key on the array?
            let copyTodos = state.todos.slice();
            copyTodos.forEach(t => {
                if (t.id === id) {
                    t.description = data.description;
                    t.state = data.state;
                }
            });
            dispatch({
                type: 'EDIT_TODO',
                payload: copyTodos
            });
            return true;
        }
        else {
            return false;
        }
    }

    async function createTodo(description) {
        let objTodo = JSON.stringify({ description });
        let response = await fetch('http://localhost:3000/todos', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': state.authToken
            },
            body: objTodo
        });
        if (response.ok) {
            let data = await response.json();
            dispatch({
                type: 'ADD_TODO',
                payload: data
            });
            return true;
        }
        else {
            return false;
        }
    }

    return {
        get: getTodos,
        edit: editTodo,
        delete: deleteTodo,
        create: createTodo
    }
}

