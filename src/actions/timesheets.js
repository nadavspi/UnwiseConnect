import { ActionTypes } from '../config/constants';
import { searchTimesheets } from '../helpers/cw';

export const search = payload => {
  return (dispatch, getState) => {
    dispatch({
      type: ActionTypes.TIMESHEETS_SEARCH,
      payload,
    });

    searchTimesheets(payload).then(response => {
      dispatch({
        type: ActionTypes.TIMESHEETS_SEARCH_SUCCESS,
        payload: response,
      });
    });
  };
};
