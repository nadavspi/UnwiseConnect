import { ActionTypes } from '../config/constants';
import { fetchTickets, dispatchTickets, updateTicketStatus } from '../helpers/cw';
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

      // Sort project ticket by wbsCode
      // ie ['1.1', '1.1.14', '4.2.1.4.6', '4.2.3']
      flattened.sort((a, b) => {
        const aParts = String(a.wbsCode).split('.');
        const bParts = String(b.wbsCode).split('.');
        for (let i = 0; i < aParts.length; ++i) {
          if (bParts.length === i || parseInt(aParts[i], 10) > parseInt(bParts[i], 10)) {
            return 1;
          } else if (parseInt(aParts[i], 10) === parseInt(bParts[i], 10)) {
            continue;
          } else {
            return -1;
          }
        }
        return 0;
      });


      dispatch({
        type: ActionTypes.TICKETS_UPDATE,
        payload: {
          flattened,
          nested,
          projectId,
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
  };
};

export const updateSingleTicket = (payload) => {
  return {
    type: ActionTypes.TICKET_UPDATE_SINGLE,
    payload,
  };
};

export const updateTickets = payload => {
  return (dispatch, getState) => {
    if (!payload.projectId) {
      throw new Error('Missing project id.');
    }

    // Make sure it's a string because that's what CW uses
    const projectId = payload.projectId.toString();

    dispatch({
      type: ActionTypes.PROJECT_TICKETS_UPDATE,
      projectId,
    });

    fetchTickets(projectId).then(tickets => {
      ref.child(`tickets/${projectId}`)
        .set(tickets);

      const { projects } = getState();
      if (!projects.length) {
        console.warn(`Uh oh. Can't update the projects list. Inform the authorities.`);
        return;
      }

      dispatch({
        type: ActionTypes.PROJECT_TICKETS_UPDATE_SUCCESS,
        projectId,
      });

      const updatedProject = {
        company: tickets[0].company.name,
        id: projectId,
        name: tickets[0].project.name,
        lastUpdated: Date.now(),
      };

      // To make updating easy, just remove any that already exists.
      let otherProjects = projects.filter(project => project.id !== projectId);
      ref.child('projects').set([
        ...otherProjects,
        updatedProject,
      ]);
    });
  };
}

export const dispatch = payload => {
  return (dispatch, getState) => {
    dispatch({
      type: ActionTypes.TICKETS_DISPATCH,
      payload,
    });

    dispatchTickets(payload.params).then(response => {
      dispatch({
        type: ActionTypes.TICKETS_DISPATCH_SUCCESS,
        payload: response,
      });
    });
  };
};

export const updateStatus = payload => {
  return (dispatch, getState) => {
    dispatch({
      type: ActionTypes.TICKET_UPDATE,
      payload,
    });

    updateTicketStatus(payload.params).then(response => {
      dispatch({
        type: ActionTypes.TICKET_UPDATE_SUCCESS,
        payload: {
          params: payload.params,
          response,
        }
      });

      if (response.status === 200) {
        dispatch(updateTickets({ projectId: payload.params.projectId }));

        setTimeout(() => {
          dispatch({
            type: ActionTypes.TICKET_UPDATE_CLEAR,
            payload,
          });
        }, 10000);
      }
    }).catch(error => {
      dispatch({
        type: ActionTypes.TICKET_UPDATE_SUCCESS,
        payload: {
          params: payload.params,
          response: {
            status: 400,
            error,
          },
        }
      });
    });

  };
}
