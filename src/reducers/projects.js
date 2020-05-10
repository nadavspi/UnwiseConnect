import { ActionTypes } from '../config/constants';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.PROJECTS_UPDATE:
      return action.payload;

    case ActionTypes.PROJECT_TICKETS_UPDATE:
      return state.map(item => item.id !== action.projectId ? item : { ...item, updating: true });

    case ActionTypes.PROJECT_TICKETS_UPDATE_SUCCESS:
      return state.map(item => item.id !== action.projectId ? item : { ...item, updating: false });

    default: 
      return state;
  }
}
