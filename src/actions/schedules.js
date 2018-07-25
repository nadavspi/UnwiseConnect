import { ActionTypes } from '../config/constants';
import { fetchTickets, dispatchTickets, fetchScheduleForDeveloper, fetchScheduleSummary } from '../helpers/cw';
import { ref } from '../config/constants';

export const subscribe = ( { developer, date }) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SCHEDULE_DEVELOPER_WEEK_SUBSCRIBE,
    });
    const scheduleItems = ref.child(`schedule/${developer}/${date}`);
    scheduleItems.on('value', snapshot => {
      dispatch({
        type: ActionTypes.SCHEDULE_DEVELOPER_WEEK_UPDATE,
        payload: snapshot.val()
      });
    });
  };
}

export const subscribeToSummary = ( { date }) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SCHEDULE_SUMMARY_WEEK_SUBSCRIBE,
    });
    const scheduleItems = ref.child(`schedule/${date}`);
    scheduleItems.on('value', snapshot => {
      dispatch({
        type: ActionTypes.SCHEDULE_SUMMARY_WEEK_UPDATE,
        payload: snapshot.val()
      });
    });
  };
}

export const updateScheduleForDeveloper = payload => {
  return (dispatch, getState) => {
    if (!payload.developer) {
      throw new Error('Missing developer id.');
    }
    fetchScheduleForDeveloper(payload.developer, payload.date).then(scheduleItems => {
      dispatch({
        type: ActionTypes.SCHEDULE_DEVELOPER_WEEK_UPDATE,
        payload: scheduleItems
      });
    });
  };
}

export const updateScheduleSummary = payload => {
  return (dispatch, getState) => {
    console.log("Fetching for " + payload.date);
    fetchScheduleSummary(payload.date).then(scheduleItems => {
      dispatch({
        type: ActionTypes.SCHEDULE_SUMMARY_WEEK_UPDATE,
        payload: scheduleItems
      });
    });
  };
}

