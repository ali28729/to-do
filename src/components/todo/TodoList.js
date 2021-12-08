import _ from 'lodash';
import { List, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TodoListItem from './TodoListItem';
import * as Actions from './store/actions';

function TodoList(props) {
  const dispatch = useDispatch();
  const todos = useSelector(({ todoApp }) => todoApp.todos.entities);
  const { searchText, selectedFilter } = useSelector(
    ({ todoApp }) => todoApp.todos,
  );
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    dispatch(Actions.getTodos(selectedFilter));
  }, [selectedFilter, dispatch]);

  useEffect(() => {
    function getFilteredArray(entities, searchText) {
      const arr = Object.keys(entities).map((id) => entities[id]);
      if (searchText.length === 0) return arr;
      return _.filter(
        arr,
        (obj) =>
          obj.notes
            .toLowerCase()
            .indexOf(searchText.toLowerCase()) !== -1 ||
          obj.title
            .toLowerCase()
            .indexOf(searchText.toLowerCase()) !== -1,
      );
    }

    if (todos) {
      setFilteredData(getFilteredArray(todos, searchText));
    }
  }, [todos, searchText]);

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center h-full">
        <Typography color="textSecondary" variant="h5">
          There are no todos!
        </Typography>
      </div>
    );
  }

  return (
    <List className="p-0">
      {filteredData.map((todo) => (
        <TodoListItem todo={todo} key={todo.id} />
      ))}
    </List>
  );
}

export default TodoList;
