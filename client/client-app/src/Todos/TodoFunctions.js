import { useContext } from 'react';
import { Store } from '../Store/Store'
import useLocalStorage from '../Store/LocalStorage';

export default function useTodoFunctions() {
    const { state, dispatch } = useContext(Store);
    const localStorage = useLocalStorage();

    async function getTodos() {
        let storageToken = localStorage.getItem('authToken');
        let auth = state.authToken;
        if (storageToken) {
            auth = storageToken.data;
        }
        let response = await fetch("http://localhost:3000/todos?orderBy=DATE_ADDED", {
            headers: { 'Authorization': auth }
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

    async function getAllTodos() {
        let storageToken = localStorage.getItem('authToken');
        let auth = state.authToken;
        if (storageToken) {
            auth = storageToken.data;
        }
        let response = await fetch("http://localhost:3000/todos/all", {
            headers: { 'Authorization': auth }
        });
        let data = await response.json();
        if (Array.isArray(data)) {
            dispatch({
                type: 'FETCH_ALL_TODOS',
                payload: data
            });
            return true;
        }
        else {
            return false;
        }
    }

    async function deleteTodo(id) {
        let storageToken = localStorage.getItem('authToken');
        let auth = state.authToken;
        if (storageToken) {
            auth = storageToken.data;
        }
        let response = await fetch(`http://localhost:3000/todos/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': auth }
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
        let storageToken = localStorage.getItem('authToken');
        let auth = state.authToken;
        if (storageToken) {
            auth = storageToken.data;
        }
        let objTodo = JSON.stringify(changes);
        let response = await fetch(`http://localhost:3000/todos/${id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': auth
            },
            body: objTodo
        });
        if (response.ok) {
            let data = await response.json();
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
        let storageToken = localStorage.getItem('authToken');
        let auth = state.authToken;
        if (storageToken) {
            auth = storageToken.data;
        }
        let objTodo = JSON.stringify({ description });
        let response = await fetch('http://localhost:3000/todos', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': auth
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
        create: createTodo,
        getAll: getAllTodos,
    }
}

