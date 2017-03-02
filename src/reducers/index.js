import { actions } from '../config/constants';

const initialState = {
  authed: false,
  loading: true,
  error: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SIGN_IN:
      return {
        authed: true,
        error: false,
        loading: false,
      };

    case actions.SIGN_OUT: 
      return {
        ...state,
        authed: false,
      };

    case actions.LOADED: 
      return {
        ...state,
        loading: false,
      };

    case actions.ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default: 
      return state;
  }
}
