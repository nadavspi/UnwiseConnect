import { ActionTypes } from '../config/constants';

const initialState = {
  inProgress: false,
  response: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.TIMESHEETS_SEARCH:
      return {
        ...state,
        inProgress: true,
        response: null,
      };

    case ActionTypes.TIMESHEETS_SEARCH_SUCCESS:
      return {
        ...state,
        inProgress: false,
        response: action.payload,
      };

    default:
      return state;
  }
};
