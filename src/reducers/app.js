import { ActionTypes } from '../config/constants';

const initialState = {
  error: undefined,
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SIGN_IN:
      return {
        ...state,
        error: false,
        loading: false,
      };

    case ActionTypes.LOADED: 
      return {
        ...state,
        loading: false,
      };

    case ActionTypes.ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default: 
      return state;
  }
}
