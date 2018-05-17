import { ActionTypes } from '../config/constants';

const initialState = {
  authed: false,
  capabilities: {},
  columns: [],
  creds: {},
  projects: [],
  toggl: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SIGN_IN:
      return {
        ...state,
        authed: true,
        creds: action.payload,
      };

    case ActionTypes.SIGN_OUT: 
      return initialState;

    case ActionTypes.USER_UPDATE: 
      return {
        ...state,
        ...action.payload,
      };

    default: 
      return state;
  }
}
