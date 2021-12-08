import _ from 'lodash';
import * as Actions from '../actions';

const initialState = {
  entities: [],
  searchText: '',
  filterParams: {},
  todoDialog: {
    type: 'new',
    props: {
      open: false,
    },
    data: null,
  },
  selectedFilter: 'all',
};

const todosReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_TODOS: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id'),
        searchText: '',
        filterParams: action.filterParams,
      };
    }
    case Actions.UPDATE_TODOS: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id'),
      };
    }
    case Actions.OPEN_NEW_TODO_DIALOG: {
      return {
        ...state,
        todoDialog: {
          type: 'new',
          props: {
            open: true,
          },
          data: null,
        },
      };
    }
    case Actions.CLOSE_NEW_TODO_DIALOG: {
      return {
        ...state,
        todoDialog: {
          type: 'new',
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case Actions.OPEN_EDIT_TODO_DIALOG: {
      return {
        ...state,
        todoDialog: {
          type: 'edit',
          props: {
            open: true,
          },
          data: action.data,
        },
      };
    }
    case Actions.CLOSE_EDIT_TODO_DIALOG: {
      return {
        ...state,
        todoDialog: {
          type: 'edit',
          props: {
            open: false,
          },
          data: null,
        },
      };
    }
    case Actions.UPDATE_TODO: {
      const todo = action.payload;

      return {
        ...state,
        entities: {
          ...state.entities,
          [todo.id]: { ...todo },
        },
      };
    }
    case Actions.SET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    case Actions.UPDATE_SELECTED_FILTER: {
      return {
        ...state,
        selectedFilter: action.filter,
      };
    }

    default:
      return state;
  }
};

export default todosReducer;
