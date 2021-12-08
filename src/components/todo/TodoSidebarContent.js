import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '@mui/material/Icon';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import * as Actions from './store/actions';

function TodoSidebarContent({ onDrawerToggle }) {
  const dispatch = useDispatch();
  const filters = useSelector(({ todoApp }) => todoApp.filters);
  const { selectedFilter } = useSelector(
    ({ todoApp }) => todoApp.todos,
  );

  return (
    <div>
      <Toolbar />
      <div className="p-4 hidden sm:block">
        <Button
          onClick={() => dispatch(Actions.openNewTodoDialog())}
          variant="contained"
          color="primary"
          className="w-full"
        >
          ADD TO-DO
        </Button>
      </div>

      <Divider />
      <List>
        <ListSubheader disableSticky>FILTERS</ListSubheader>
        <ListItem
          selected={selectedFilter === 'all' ? true : false}
          onClick={() => {
            dispatch(Actions.updateSelectedFilter('all'));
            onDrawerToggle();
          }}
          button
          key="all"
        >
          <ListItemIcon>
            <ClearAllIcon />
          </ListItemIcon>
          <ListItemText primary="All" />
        </ListItem>
      </List>
      <Divider />

      <List>
        {filters.map((filter) => (
          <ListItem
            selected={filter.handle === selectedFilter ? true : false}
            onClick={() => {
              dispatch(Actions.updateSelectedFilter(filter.handle));
              onDrawerToggle();
            }}
            button
            key={filter.id}
          >
            <ListItemIcon>
              <Icon className="list-item-icon" color="action">
                {filter.icon}
              </Icon>
            </ListItemIcon>
            <ListItemText
              primary={filter.title}
              disableTypography={true}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );
}

export default TodoSidebarContent;
