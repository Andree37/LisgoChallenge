import React, { useState, useEffect } from 'react';
import TodoList from './TodoList'

export const TodoContext = React.createContext({ todos: null });

function App() {
  const [todos, setTodos] = useState([]);

  const store = {
    todos: { get: todos, set: setTodos, delete: deleteTodo, create: createTodo, edit: editTodo }
  }

  function deleteTodo(id) {
    fetch(`http://localhost:3000/todos/${id}`, { method: 'DELETE' })
      .then(res => {
        if (res.ok) {
          let newTodos = todos.filter(t => {
            return t.id !== id;
          })
          setTodos(newTodos);
        }
        else {
          console.log("Did not delete");
        }
      })
  }

  function createTodo(description) {
    let objTodo = JSON.stringify({ description: description });
    fetch('http://localhost:3000/todos', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, body: objTodo
    })
      .then(res => {
        if (res.ok) {
          res.json()
            .then(result => {
              // dont think i need to recreate a new array for this
              let newTodos = todos.slice();
              newTodos.push(result);
              setTodos(newTodos);
            })
        }
        else {
          console.log("Did not create");
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
      }, body: objTodo
    })
      .then(res => {
        if (res.ok) {
          res.json()
            .then(result => {
              // probably a better way of doing this, making it O(1) need to think more, maybe getting it from the key on the array?
              todos.forEach(t => {
                if(t.id === id) {
                  t.description = result.description;
                }
              });
              alert('You changed the description to: ' + result.description);
            })
        }
      });
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
