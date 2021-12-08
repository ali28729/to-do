import * as Actions from '../actions/app.actions';

const initialState = {
  appName: 'To-Do Challenge',
};

const dialog = function (state = initialState, action) {
  switch (action.type) {
    case Actions.CHANGE_APP_NAME: {
      return {
        ...state,
        appName: action.name,
      };
    }

    default: {
      return state;
    }
  }
};

export default dialog;
