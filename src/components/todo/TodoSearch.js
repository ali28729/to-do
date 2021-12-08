import React from 'react';
import { Icon, Input, Paper } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';

function TodoSearch(props) {
  const dispatch = useDispatch();
  const searchText = useSelector(
    ({ todoApp }) => todoApp.todos.searchText,
  );
  return (
    <div className="flex flex-1">
      <Paper
        className="flex items-center w-full h-12 mb-4 sm:h-12 p-2 pl-4 md:pl-8 rounded-8 "
        elevation={2}
      >
        <Icon color="action">search</Icon>

        <Input
          placeholder="Search the To-Dos"
          className="pl-16"
          disableUnderline
          fullWidth
          value={searchText}
          inputProps={{
            'aria-label': 'Search the To-Dos',
          }}
          onChange={(ev) => dispatch(Actions.setSearchText(ev))}
        />
      </Paper>
    </div>
  );
}

export default TodoSearch;
