import { combineReducers } from 'redux';
import todos from './todos.reducer';
import filters from './filters.reducer';

const reducer = combineReducers({
  todos,
  filters,
});

export default reducer;
