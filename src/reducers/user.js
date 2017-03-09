import { ActionTypes } from '../config/constants';

const initialState = {
  authed: false,
  creds: {},
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

    default: 
      return state;
  }
}
