import React from 'react';
import {
  Typography,
  Checkbox,
  ListItem,
  ListItemText,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import _ from 'lodash';
import * as Actions from './store/actions';

const useStyles = makeStyles({
  todoItem: {
    '&.completed': {
      background: 'rgba(0,0,0,0.03)',
      '& .todo-title, & .todo-notes': {
        textDecoration: 'line-through',
      },
    },
  },
});

function TodoListItem(props) {
  const dispatch = useDispatch();

  const classes = useStyles(props);

  return (
    <ListItem
      className={clsx(
        classes.todoItem,
        {
          completed: props.todo.completed,
        },
        'w-full',
      )}
      onClick={(ev) => {
        dispatch(Actions.openEditTodoDialog(props.todo));
      }}
      margin="normal"
      disablePadding
      button
    >
      <Checkbox
        tabIndex={-1}
        disableRipple
        checked={props.todo.completed}
        onChange={() => dispatch(Actions.toggleCompleted(props.todo))}
        onClick={(ev) => ev.stopPropagation()}
      />

      <ListItemText
        className="sm:ml-4 ml-2"
        primary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              className="todo-title"
            >
              {props.todo.title}
            </Typography>
          </React.Fragment>
        }
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="textSecondary"
              className="todo-notes "
            >
              {_.truncate(
                props.todo.notes.replace(/<(?:.|\n)*?>/gm, ''),
                {
                  length: 180,
                },
              )}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
}

export default TodoListItem;
