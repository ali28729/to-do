import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Icon from '@mui/material/Icon';

import withReducer from 'store/withReducer';
import TodoList from './TodoList';
import TodoSearch from './TodoSearch';
import TodoDialog from './TodoDialog';
import TodoSidebarContent from './TodoSidebarContent';
import * as Actions from './store/actions';
import reducer from './store/reducers';

const drawerWidth = 240;

const useStyles = makeStyles({
  roundBtn: {
    backgroundColor: '#3176d2',
    borderRadius: '500px !important',
    width: '65px',
    height: '65px',
    position: 'fixed !important',
    bottom: '10px !important',
    right: '10px !important',
    '& span': {
      margin: '0 !important',
    },
  },
  roundBtnIcon: {
    margin: '0 !important',
  },
});

function TodoApp(props) {
  const { window } = props;
  const classes = useStyles(props);

  const dispatch = useDispatch();
  const appName = useSelector(({ app }) => app.appName);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  useEffect(() => {
    dispatch(Actions.getFilters());
  }, [dispatch]);

  useEffect(() => {
    dispatch(Actions.getTodos('all'));
  }, [dispatch]);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {appName}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
          }}
          aria-label="filters"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            <TodoSidebarContent onDrawerToggle={handleDrawerToggle} />
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
            open
          >
            <TodoSidebarContent />
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <TodoSearch />
          <TodoList />
        </Box>
      </Box>

      <div className="sm:hidden">
        <Button
          variant="contained"
          className={classes.roundBtn}
          endIcon={<Icon>add</Icon>}
          onClick={() => dispatch(Actions.openNewTodoDialog())}
        ></Button>
      </div>

      <TodoDialog />
    </React.Fragment>
  );
}

export default withReducer('todoApp', reducer)(TodoApp);
