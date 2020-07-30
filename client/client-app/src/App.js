import React, { useEffect, useContext } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { Store } from './Store/Store';
import TodoList from './Todos/TodoList'
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
    <Router>
      <Switch>
        <Route path="/login" component={LoginForm} />
        <Route path="/" component={TodoList} />
      </Switch>
    </Router>
  );
}


export default App;