import React, { useEffect, useContext } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { Store } from './Store/Store';
import TodoList from './Todos/TodoList'
import useTodoFunctions from './Todos/TodoFunctions';
import LoginForm from './Auth/LoginForm';
import AdminPage from './Admin/AdminPage';
import useAdminFunctions from './Admin/AdminFunctions';
import useLocalStorage from './Store/LocalStorage';

function App() {
  const { state } = useContext(Store);
  const todoFunctions = useTodoFunctions();
  const adminFunctions = useAdminFunctions();
  const localStorage = useLocalStorage();

  //get todos after app is mounted and if the authtoken is present
  useEffect(() => {
    state.todos === null && (state.authToken || localStorage.getItem('authToken')) && todoFunctions.get() && adminFunctions.getUsers();
  });

  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginForm} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/" component={TodoList} />
      </Switch>
    </Router>
  );
}


export default App;