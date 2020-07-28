import React, { useEffect, useContext } from 'react';
import TodoList from './Todos/TodoList'
import { Store } from './Store/Store';
import useTodoFunctions from './Todos/TodoFunctions';
import LoginForm from './Auth/LoginForm';

function App() {
  const { state } = useContext(Store);
  const todoFunctions = useTodoFunctions();

  //get todos after app is mounted and if the authtoken is present
  useEffect(() => {
    state.todos.length === 0 && state.authToken && todoFunctions.get();
  }, [state.todos, state.authToken, todoFunctions]);

  return (
    <div>
      <div>
        <TodoList />
      </div>
      <div>
        <LoginForm />
      </div>
    </div>
  );
}


export default App;