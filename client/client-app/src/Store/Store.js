import React, { useReducer } from 'react'

export const Store = React.createContext();

const initialState = {
    todos: null,
    allTodos: null,
    authToken: null,
    users: null
}

function reducer(state, action) {
    switch (action.type) {
        //these are the same
        case 'FETCH_TODO':
            return { ...state, todos: action.payload };
        case 'DELETE_TODO':
            return { ...state, todos: action.payload };
        case 'EDIT_TODO':
            return { ...state, todos: action.payload };
        case 'ADD_TODO':
            return { ...state, todos: [...state.todos, action.payload] }
        case 'LOGIN':
            return { ...state, authToken: action.payload };
        case 'LOGOUT':
            return { todos: null, users: null, authToken: null, allTodos: null };
        case 'FETCH_USERS':
            return { ...state, users: action.payload };
        case 'ADD_USER':
            return { ...state, users: [...state.users, action.payload] };
        case 'FETCH_ALL_TODOS':
            return { ...state, allTodos: action.payload };
        default:
            return state;
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return (
        <Store.Provider value={value}>
            {props.children}
        </Store.Provider>)
}