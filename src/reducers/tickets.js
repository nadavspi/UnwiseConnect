import { ActionTypes } from '../config/constants';
import cloneDeep from 'lodash.clonedeep';

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
        loading: false,
        nested: {
          ...state.nested,
          [action.payload.projectId]: action.payload.nested,
        },
        flattened: [
          ...state.flattened.filter(
            ticket => ticket.project.id !== action.payload.projectId
          ),
          ...action.payload.flattened,
        ],
      };

    case ActionTypes.TICKETS_REMOVE:
      const nested = cloneDeep(state.nested);
      delete nested[action.payload.projectId];
      return {
        ...state,
        nested,
        flattened: state.flattened.filter(
          ticket => ticket.project.id !== action.payload.projectId
        ),
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
