import { useContext } from 'react';
import { Store } from './Store'

export default function useTodoFunctions() {
    const { state, dispatch } = useContext(Store);

    function getTodos() {
        fetch("http://localhost:3000/todos")
            .then(res => res.json())
            .then((result) => {
                return dispatch({
                    type: 'FETCH_TODO',
                    payload: result
                });
            });
    }

    function deleteTodo(id) {
        fetch(`http://localhost:3000/todos/${id}`, { method: 'DELETE' })
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
        
    function editTodo(id, changes) {
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
                                    t.state = result.state;
                                }
                            });
                        });
                        alert("Updated Task");
                }
                else {
                    throw new Error("Task is already completed, cannot change description");
                }
            }).catch(err => {console.log(err.message)})
    }

    function createTodo(description) {
        let objTodo = JSON.stringify({
            description: description
        });
        fetch('http://localhost:3000/todos', {
            method: 'PUT',
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
                            return dispatch({
                                type: 'ADD_TODO',
                                payload: result
                            });
                        });
                } else {
                    console.log("Did not create");
                }
            })
    }

    return {
        get: getTodos,
        edit: editTodo,
        delete: deleteTodo,
        create: createTodo
    }
}
