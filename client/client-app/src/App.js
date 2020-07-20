import React, { useEffect, useContext } from 'react';
import TodoList from './TodoList'
import { Store } from './Store';
import useTodoFunctions from './TodoFunctions'

function App() {
  const { state } = useContext(Store);
  const todoFunctions = useTodoFunctions();

  //get todos after app is mounted
  useEffect(() => {
    state.todos.length === 0 && todoFunctions.get();
  });

  return (
    <div>
      <TodoList />
    </div>
  );
}


export default App;