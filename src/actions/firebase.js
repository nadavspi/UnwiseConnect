import { ActionTypes } from '../config/constants';
import { ref } from '../config/constants'

export const set = payload => {
  return dispatch => {
    dispatch({
      type: ActionTypes.FIREBASE_SET_REQUEST,
      payload,
    });
    const write = ref.child(payload.path).set(payload.data);

    write.then(res => dispatch({
      type: ActionTypes.FIREBASE_SET_SUCCESS,
      payload: res,
    })).catch(res => dispatch({
      type: ActionTypes.FIREBASE_SET_ERROR,
      payload: res,
    }));
  };
}
