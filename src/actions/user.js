import { ActionTypes } from '../config/constants';
import { ref } from '../config/constants';

const subscribeProjects = uid => {
  return (dispatch) => {
    const projectsRef = ref.child(`users/${uid}/projects`);
    projectsRef.on('value', snapshot => {
      const projects = snapshot.val();

      dispatch({
        type: ActionTypes.USER_UPDATE,
        payload: {
          projects,
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
  }
};

export const toggleProject = payload => {
  return (dispatch, getState) => {
    const projects = getState().user.projects || [];
    const { uid } = getState().user.creds;
    let nextProjects;

    if (payload.add) {
      nextProjects = [...projects, payload.projectId];
    } else {
      nextProjects = projects.filter(id => id !== payload.projectId);
    }

    const projectsRef = ref.child(`users/${uid}/projects`);
    projectsRef.set(nextProjects);
  };
};
