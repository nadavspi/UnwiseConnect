import { ActionTypes } from '../config/constants';

const initialState = {
  flattened: [],
  loading: false,
  nested: {},
  query: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.TICKETS_SUBSCRIBE:
      return {
        ...state,
        loading: true,
      };

    case ActionTypes.TICKETS_UPDATE:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };

    case ActionTypes.TICKETS_SEARCH:
      return {
        ...state,
        query: action.payload,
      };

    default:
      return state;
  }
};
