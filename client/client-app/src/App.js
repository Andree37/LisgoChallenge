import React, { useEffect, useContext } from 'react';
import TodoList from './TodoList'
import { Store } from './Store';

function App() {
  const { state, dispatch } = useContext(Store);

  async function getTodos() {
    fetch("http://localhost:3000/todos")
      .then(res => res.json())
      .then((result) => {
        return dispatch({
          type: 'FETCH_TODO',
          payload: result
        });
      });
  }

  //get todos after app is mounted
  useEffect(() => {
    state.todos.length === 0 && getTodos();
  });

  return (
    <div>
      <TodoList />
    </div>
  );
}


export default App;