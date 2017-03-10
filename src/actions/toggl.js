import * as firebase from './firebase';
import fetch from 'isomorphic-fetch';
import { ActionTypes } from '../config/constants';
import { checkStatus, parseJSON } from '../helpers/utils';
import { ref } from '../config/constants';

export const saveKey = apiKey => {
  return (dispatch, getState) => {
    const { uid } = getState().user.creds;
    if (!uid) {
      throw new Error(`No UID. That's not supposed to happen.`);
    }

    dispatch(firebase.set({
      path: `users/${uid}/toggl`,
      data: {
        apiKey,
      },
    }));
  };
};

export const subscribe = (maybeUid) => {
  return (dispatch, getState) => {
    let uid = maybeUid || getState().user.creds;
    if (!uid) {
      throw new Error(`No UID. That's not supposed to happen.`);
    }

    const togglRef = ref.child(`users/${uid}/toggl`);
    togglRef.on('value', snapshot => {
      const toggl = snapshot.val();

      dispatch({
        type: ActionTypes.USER_UPDATE,
        payload: {
          toggl,
        },
      });
    });
  }
}

export const startTimer = payload => {
  return (dispatch, getState) => {
    const { apiKey } = getState().user.toggl;
    if (!apiKey) {
      throw new Error('Missing toggl API key.');
    }
    if (!payload.description) {
      throw new Error('Missing description.');
    }
    console.log('hey', payload, apiKey);

    const headers = {
      Authorization: `Basic ${process.env.REACT_APP_API_KEY}`,
      'Content-Type': 'application/json',
    };

    fetch(`${process.env.REACT_APP_API_URL}/v1/toggl/start`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        apiKey,
        ...payload,
      }),
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(res => {
        dispatch({
          type: ActionTypes.TOGGL_START,
          payload: res,
        });
      });
  };
};

