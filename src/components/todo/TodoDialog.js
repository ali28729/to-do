import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  Icon,
  Dialog,
  Button,
  AppBar,
  Toolbar,
  Divider,
  Checkbox,
  TextField,
  IconButton,
  Typography,
  FormControl,
  DialogActions,
  DialogContent,
  FormControlLabel,
} from '@mui/material';
import useForm from './../../containers/forms';
import * as Actions from './store/actions';

const defaultFormState = {
  id: '',
  title: '',
  notes: '',
  completed: false,
  deleted: false,
};

function TodoDialog(props) {
  const dispatch = useDispatch();
  const todoDialog = useSelector(
    ({ todoApp }) => todoApp.todos.todoDialog,
  );

  const { form, handleChange, setForm } = useForm({
    ...defaultFormState,
  });

  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (todoDialog.type === 'edit' && todoDialog.data) {
      setForm({ ...todoDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (todoDialog.type === 'new') {
      setForm({
        ...defaultFormState,
        ...todoDialog.data,
        id: uuidv4(),
      });
    }
  }, [todoDialog.data, todoDialog.type, setForm]);

  useEffect(() => {
    /**
     * After Dialog Open
     */
    if (todoDialog.props.open) {
      initDialog();
    }
  }, [todoDialog.props.open, initDialog]);

  function closeTodoDialog() {
    todoDialog.type === 'edit'
      ? dispatch(Actions.closeEditTodoDialog())
      : dispatch(Actions.closeNewTodoDialog());
  }

  function toggleCompleted() {
    setForm({
      ...form,
      completed: !form.completed,
    });
  }

  function canBeSubmitted() {
    return form.title.length > 0;
  }

  return (
    <Dialog
      {...todoDialog.props}
      onClose={closeTodoDialog}
      fullWidth
      maxWidth="sm"
    >
      <AppBar position="static" elevation={1}>
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {todoDialog.type === 'new' ? 'New Todo' : 'Edit Todo'}
          </Typography>
        </Toolbar>
      </AppBar>

      <DialogContent classes={{ root: 'p-0' }}>
        <div className="mb-4">
          <div className="flex items-center justify-between px-0 sm:px-4">
            <div className="flex">
              <FormControlLabel
                control={
                  <Checkbox
                    tabIndex={-1}
                    checked={form.completed}
                    onChange={toggleCompleted}
                    onClick={(ev) => ev.stopPropagation()}
                  />
                }
                label="Is Done?"
              />
            </div>
          </div>
          <Divider className="mx-24" />
        </div>

        <div className="px-0 sm:px-4">
          <FormControl required fullWidth>
            <TextField
              label="Title"
              autoFocus
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              variant="outlined"
              margin="normal"
            />
          </FormControl>

          <FormControl required fullWidth>
            <TextField
              label="Notes"
              name="notes"
              multiline
              rows="6"
              value={form.notes}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
          </FormControl>
        </div>
      </DialogContent>

      {todoDialog.type === 'new' ? (
        <DialogActions className="justify-between pl-8 sm:pl-16">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              dispatch(Actions.addTodo(form));
              closeTodoDialog();
            }}
            disabled={!canBeSubmitted()}
          >
            Add
          </Button>
        </DialogActions>
      ) : (
        <DialogActions className="justify-between pl-8 sm:pl-16">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              dispatch(Actions.updateTodo(form));
              closeTodoDialog();
            }}
            disabled={!canBeSubmitted()}
          >
            Save
          </Button>
          {form.deleted ? (
            <IconButton
              className="min-w-auto"
              onClick={() => {
                dispatch(Actions.undoTodoRemoval(form.id));
                closeTodoDialog();
              }}
              size="large"
            >
              <Icon color="primary">undo</Icon>
            </IconButton>
          ) : (
            <IconButton
              className="min-w-auto"
              onClick={() => {
                dispatch(Actions.removeTodo(form.id));
                closeTodoDialog();
              }}
              size="large"
            >
              <Icon color="error">delete</Icon>
            </IconButton>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
}

export default TodoDialog;
