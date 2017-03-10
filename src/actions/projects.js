import { ActionTypes } from '../config/constants';
import { ref } from '../config/constants';

export const subscribe = () => {
  return (dispatch) => {
    const projectsRef = ref.child(`projects`);
    projectsRef.on('value', snapshot => {
      const projects = snapshot.val();

      dispatch({
        type: ActionTypes.PROJECTS_UPDATE,
        payload: projects,
      });
    });
  }
}
