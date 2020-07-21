import React, { useReducer } from 'react'

export const Store = React.createContext();

const initialState = {
    todos: []
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