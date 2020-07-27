import React, { useEffect, useContext } from 'react';
import TodoList from './TodoList'
import { Store } from './Store';
import useTodoFunctions from './TodoFunctions';
import LoginForm from './LoginForm';

function App() {
  const { state } = useContext(Store);
  const todoFunctions = useTodoFunctions();

  //get todos after app is mounted
  useEffect(() => {
    state.todos.length === 0 && todoFunctions.get();
  }, [state.authToken]);

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