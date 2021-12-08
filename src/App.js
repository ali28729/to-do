import * as React from 'react';
import Provider from 'react-redux/es/components/Provider';
import CssBaseline from '@mui/material/CssBaseline';
import TodoApp from './components/todo/TodoApp';
import store from './store';
import '@fake-db';

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <TodoApp />
    </Provider>
  );
}

export default App;
