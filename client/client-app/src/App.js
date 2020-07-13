import React from 'react';
import TodoList from './TodoList'

const todo = [
  {
    id: 1,
    state: 'INCOMPLETE',
    description: 'desc',
    dateAdded: new Date().toUTCString()
  },
  {
    id: 2,
    state: 'INCOMPLETE',
    description: 'desc2',
    dateAdded: new Date().toUTCString()
  },
  {
    id: 3,
    state: 'COMPLETE',
    description: 'desc3',
    dateAdded: new Date().toUTCString()
  },
];

function App() {
  return (
    <div>
      <TodoList todo={todo} />
    </div>
  );
}

export default App;
