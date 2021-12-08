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
  title: { display: 'inline', wordBreak: 'break-word' },
  notes: { display: 'inline', wordBreak: 'break-word' },
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
      className={clsx(classes.todoItem, {
        completed: props.todo.completed,
      })}
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
              component="span"
              className={clsx(classes.title, 'todo-title')}
            >
              {_.truncate(props.todo.title, { length: 170 })}
            </Typography>
          </React.Fragment>
        }
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              color="textSecondary"
              className={clsx(classes.notes, 'todo-notes')}
            >
              {_.truncate(
                props.todo.notes.replace(/<(?:.|\n)*?>/gm, ''),
                { length: 500 },
              )}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
}

export default TodoListItem;
