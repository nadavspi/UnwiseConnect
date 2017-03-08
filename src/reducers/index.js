import { ActionTypes } from '../config/constants';

const initialState = {
  authed: false,
  loading: true,
  error: undefined,
  tickets: {
    flattened: [],
    loading: false,
    nested: {},
    query: {},
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SIGN_IN:
      return {
        ...state,
        authed: true,
        error: false,
        loading: false,
      };

    case ActionTypes.SIGN_OUT: 
      return {
        ...state,
        authed: false,
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

    case ActionTypes.TICKETS_SUBSCRIBE: 
      return {
        ...state,
        tickets: {
          ...state.tickets,
          loading: true,
        },
      };

    case ActionTypes.TICKETS_UPDATE: 
      return {
        ...state,
        tickets: {
          ...state.tickets,
          ...action.payload,
          loading: false,
        },
      };

    case ActionTypes.TICKETS_SEARCH: 
      return {
        ...state,
        tickets: {
          ...state.tickets,
          query: action.payload,
        },
      };

    default: 
      return state;
  }
}
