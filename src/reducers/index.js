import { actions } from '../config/constants';

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
    case actions.SIGN_IN:
      return {
        ...state,
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

    case actions.TICKETS_SUBSCRIBE: 
      return {
        ...state,
        tickets: {
          ...state.tickets,
          loading: true,
        },
      };

    case actions.TICKETS_UPDATE: 
      return {
        ...state,
        tickets: {
          ...state.tickets,
          ...action.payload,
          loading: false,
        },
      };

    case actions.TICKETS_SEARCH: 
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
