import { ActionTypes } from '../config/constants';

const initialState = {
  flattened: [],
  loading: false,
  nested: {},
  pending: [],
  query: {},
  dispatching: {
    inProgress: false,
    response: null,
  },
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
            ticket => String(ticket.project.id) !== String(action.payload.projectId)
          ),
          ...action.payload.flattened,
        ],
      };

    case ActionTypes.TICKETS_REMOVE:
      const nested = { ...state.nested };
      delete nested[action.payload.projectId];
      return {
        ...state,
        nested,
        flattened: state.flattened.filter(
          ticket => String(ticket.project.id) !== String(action.payload.projectId)
        ),
      };

    case ActionTypes.TICKETS_SEARCH:
      return {
        ...state,
        query: action.payload,
      };

    case ActionTypes.TICKETS_DISPATCH:
      return {
        ...state,
        dispatching: {
          inProgress: true,
          response: null,
        },
      };

    case ActionTypes.TICKETS_DISPATCH_SUCCESS:
      return {
        ...state,
        dispatching: {
          inProgress: false,
          response: action.payload,
        },
      };

    case ActionTypes.TICKET_UPDATE:
      return {
        ...state,
        pending: [
          ...state.pending.filter(pending => (
            // Remove any stale requests of the same ticket
            pending.params.ticket !== action.payload.params.ticket
          )),
          {
            ...action.payload,
            inProgress: true,
          }
        ],
      };

    case ActionTypes.TICKET_UPDATE_SINGLE:
      return {
        ...state,
        flattened: [
          ...state.flattened,
          action.payload.result
        ],
      };

    case ActionTypes.TICKET_UPDATE_CLEAR:
      return {
        ...state,
        pending: [
          ...state.pending.filter(pending => (
            // Remove any stale requests of the same ticket
            pending.params.ticket !== action.payload.params.ticket
          )),
        ],
      };

    case ActionTypes.TICKET_UPDATE_SUCCESS:
      return {
        ...state,
        pending: state.pending.map(item => {
          if (item.params.ticket === action.payload.params.ticket) {
            return action.payload;
          }

          return item;
        }),
      };

    default:
      return state;
  }
};
