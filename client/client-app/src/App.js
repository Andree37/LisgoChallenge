import React, { useState, useEffect } from 'react';
import TodoList from './TodoList'

export const TodoContext = React.createContext({ todos: null });

function App() {
  const [todos, setTodos] = useState([]);

  const store = {
    todos: { get: todos, set: setTodos, delete: deleteTodo }
  }

  function deleteTodo(id) {

    let deleteInit = {
      method: 'DELETE',
      headers: new Headers(),
      mode: 'cors',
      cache: 'default'
    }

    fetch(`http://localhost:3000/todos/${id}`, deleteInit)
      .then(res => {
        if (res.ok) {
          let newTodos = store.todos.get.filter(t => {
            return t.id !== id;
          })
          store.todos.set(newTodos);
        }
        else {
          console.log("Did not delete")
        }
      })

  }

  //get todos after app is mounted
  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then(res => res.json())
      .then((result) => {
        setTodos(result);
      });
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
