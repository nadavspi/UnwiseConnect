import * as TicketsActions from './tickets';
import { ActionTypes } from '../config/constants';
import { ref } from '../config/constants';

const subscribeProjects = uid => {
  return (dispatch, getState) => {
    const projectsRef = ref.child(`users/${uid}/projects`);
    projectsRef.on('value', snapshot => {
      const projects = snapshot.val();

      // They haven't selected any projects
      if (!projects) {
        return;
      }

      // First load
      if (getState().user.projects.length === 0 && projects.length > 0) {
        projects.forEach(projectId => {
          dispatch(TicketsActions.subscribe({ projectId }));
        });
      }

      dispatch({
        type: ActionTypes.USER_UPDATE,
        payload: {
          projects,
        },
      });
    });
  }
}

export const subscribeCapabilities = uid => {
  return (dispatch, getState) => {
    const capabilitiesRef = ref.child(`users/${uid}/capabilities`);
    capabilitiesRef.on('value', snapshot => {
      const capabilities = snapshot.val();

      // They don't have any capabilities
      if (!capabilities) {
        return;
      }

      dispatch({
        type: ActionTypes.USER_UPDATE,
        payload: {
          capabilities,
        },
      });
    });
  }
}

export const subscribe = (maybeUid) => {
  return (dispatch, getState) => {
    let uid = maybeUid || getState().user.creds;
    if (!uid) {
      throw new Error(`No UID. That's not supposed to happen.`);
    }

    dispatch(subscribeProjects(uid));
    dispatch(subscribeCapabilities(uid));
  }
};

export const toggleProject = payload => {
  return (dispatch, getState) => {
    const projects = getState().user.projects || [];
    const { uid } = getState().user.creds;
    let nextProjects;

    if (payload.add) {
      nextProjects = [...projects, payload.projectId];
      dispatch(TicketsActions.subscribe({ projectId: payload.projectId }));
    } else {
      nextProjects = projects.filter(id => id !== payload.projectId);
      dispatch(TicketsActions.unsubscribe({ projectId: payload.projectId }));
    }

    const projectsRef = ref.child(`users/${uid}/projects`);
    projectsRef.set(nextProjects);
  };
};
