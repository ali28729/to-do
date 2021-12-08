import { combineReducers } from 'redux';
import app from './app.reducer';

const createReducer = (asyncReducers) =>
  combineReducers({
    app,
    ...asyncReducers,
  });

export default createReducer;
