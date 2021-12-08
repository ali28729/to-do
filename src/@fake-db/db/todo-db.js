import mock from './../mock';

const todoDB = {
  todos: [],

  filters: [
    {
      id: 0,
      handle: 'todo',
      title: 'To-Do',
      icon: 'schedule',
    },
    {
      id: 1,
      handle: 'completed',
      title: 'Done',
      icon: 'check',
    },
    {
      id: 2,
      handle: 'deleted',
      title: 'Deleted',
      icon: 'delete',
    },
  ],
};

mock.onGet('/api/todo-app/todos').reply((config) => {
  const params = config.params;
  let response = [];

  if (params) {
    if (params === 'deleted') {
      response = todoDB.todos.filter((todo) => todo.deleted);
    } else if (params === 'completed') {
      response = todoDB.todos.filter(
        (todo) => todo[params] && todo.completed,
      );
    } else if (params === 'todo') {
      response = todoDB.todos.filter(
        (todo) => !todo.completed && !todo.deleted,
      );
    } else response = todoDB.todos.filter((todo) => !todo.deleted);
  } else response = todoDB.todos.filter((todo) => !todo.deleted);

  return [200, response];
});

mock.onPost('/api/todo-app/update-todo').reply((request) => {
  const todo = JSON.parse(request.data);

  todoDB.todos = todoDB.todos.map((_todo) => {
    if (_todo.id === todo.id) return todo;

    return _todo;
  });

  return [200, todo];
});

mock.onPost('/api/todo-app/new-todo').reply((request) => {
  const todo = JSON.parse(request.data);

  todoDB.todos = [todo, ...todoDB.todos];

  return [200, todo];
});

mock.onPost('/api/todo-app/remove-todo').reply((request) => {
  const todoId = request.data;
  todoDB.todos = todoDB.todos.map((_todo) => {
    if (_todo.id === todoId) {
      _todo.deleted = true;
    }
    return _todo;
  });
  return [200, todoId];
});

mock.onPost('/api/todo-app/undo-todo-removal').reply((request) => {
  const todoId = request.data;
  todoDB.todos = todoDB.todos.map((_todo) => {
    if (_todo.id === todoId) {
      _todo.deleted = false;
    }
    return _todo;
  });
  return [200, todoId];
});

mock.onGet('/api/todo-app/filters').reply(200, todoDB.filters);
