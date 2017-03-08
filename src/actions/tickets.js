import { actions } from '../config/constants';
import { ref } from '../config/constants';

export const subscribe = () => {
  return (dispatch) => {

    dispatch({
      type: actions.TICKETS_SUBSCRIBE,
    });

    const tickets = ref.child('tickets');
    tickets.on('value', snapshot => {
      const nested = snapshot.val();
      const flattened = Object.keys(nested).map(project => nested[project]).reduce((prev, next) => prev.concat(next), []);

      dispatch({
        type: actions.TICKETS_UPDATE,
        payload: {
          flattened,
          nested,
        },
      });
    });
  };
}

export const search = (payload) => {
  return {
    type: actions.TICKETS_SEARCH,
    payload,
  }
}
