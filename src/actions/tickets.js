import { ActionTypes } from '../config/constants';
import { fetchTickets } from '../helpers/cw';
import { ref } from '../config/constants';

export const subscribe = ({ projectId }) => {
  return (dispatch) => {

    dispatch({
      type: ActionTypes.TICKETS_SUBSCRIBE,
    });

    const tickets = ref.child(`tickets/${projectId}`);
    tickets.on('value', snapshot => {
      const nested = snapshot.val();
      const flattened = Object.keys(nested).map(project => nested[project]).reduce((prev, next) => prev.concat(next), []);

      dispatch({
        type: ActionTypes.TICKETS_UPDATE,
        payload: {
          projectId,
          flattened,
          nested,
        },
      });
    });
  };
}

export const unsubscribe = ({ projectId }) => {
  return dispatch => {
    const tickets = ref.child(`tickets/${projectId}`);
    tickets.off();

    dispatch({
      type: ActionTypes.TICKETS_REMOVE,
      payload: {
        projectId,
      },
    });
  };
};

export const search = (payload) => {
  return {
    type: ActionTypes.TICKETS_SEARCH,
    payload,
  }
}

export const updateTickets = payload => {
  return (dispatch, getState) => {
    if (!payload.projectId) {
      throw new Error('Missing project id.');
    }

    fetchTickets(payload.projectId).then(tickets => {
      ref.child(`tickets/${payload.projectId}`)
        .set(tickets);

      const { projects } = getState();
      if (!projects.length) {
        console.warn(`Uh oh. Can't update the projects list. Inform the authorities.`);
        return;
      }

      // New project
      // We're assuming the company or name of existing projects will never
      // need to change, which should mostly be correct.
      if (projects.map(project => project.id).indexOf(payload.projectId) === -1) {
        const project = {
          company: tickets[0].company.name,
          id: payload.projectId,
          name: tickets[0].project.name,
        };

        ref.child('projects').set([
          ...projects,
          project,
        ]);
      }
    });
  };
}
