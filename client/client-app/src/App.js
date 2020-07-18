import React, { useState, useEffect } from 'react';
import TodoList from './TodoList'

export const TodoContext = React.createContext([]);

function App() {
  const [todos, setTodos] = useState([]);

  const store = {
    todos: { get: todos, set: setTodos}
  }

  //get todos after app is mounted
  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then(res => res.json())
      .then((result) => {
        setTodos(result);
      })
  }, []);

  return (
    <TodoContext.Provider value={store}>
      <div>
        <TodoList />
      </div>
    </TodoContext.Provider>
  );
}


export default App;
