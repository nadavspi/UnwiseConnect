import { ActionTypes } from '../config/constants';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.PROJECTS_UPDATE:
      return action.payload;

    default: 
      return state;
  }
}
