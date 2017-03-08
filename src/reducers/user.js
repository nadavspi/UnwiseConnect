import { ActionTypes } from '../config/constants';

const initialState = {
  authed: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SIGN_IN:
      return {
        ...state,
        authed: true,
      };

    case ActionTypes.SIGN_OUT: 
      return {
        authed: false,
      };

    default: 
      return state;
  }
}
