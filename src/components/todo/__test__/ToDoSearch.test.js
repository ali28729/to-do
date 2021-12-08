import { render, fireEvent } from '@testing-library/react';
import TodoSearch from '../TodoSearch';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('Search Component', () => {
  const initialState = { todoApp: { todos: { searchText: '' } } };
  const mockStore = configureStore();
  let store;

  it('Is the search bar rendered', () => {
    store = mockStore(initialState);
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <TodoSearch />
      </Provider>,
    );

    expect(
      getByPlaceholderText(/Search the To-Dos/i),
    ).toBeInTheDocument();
  });
});
