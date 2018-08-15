import { ActionTypes, ref } from '../config/constants';
import { createWorkplan } from '../helpers/cw';

export const addItem = payload => {
  return dispatch => {
    const itemRef = ref.child(`budgets/items/${payload.item.id}`);

    itemRef.set( payload.item );

    dispatch({
      type: ActionTypes.BUDGETS_ADD_ITEM,
      payload,
    });
  };
}

export const createPlan = payload => {
  return dispatch => {
    dispatch ({
      type: ActionTypes.BUDGETS_CREATE_PLAN,
      payload,
    });

    createWorkplan(payload).then(response => {
      dispatch({
        type: ActionTypes.BUDGETS_CREATE_PLAN_SUCCESS,
        payload: response,
      });
    });
  };
}

export const removeItem = payload => {
  return dispatch => {
    const itemRef = ref.child(`budgets/items/${payload.itemId}`);

    itemRef.remove();

    dispatch({
      type: ActionTypes.BUDGETS_REMOVE_ITEM,
      payload,
    });
  };
}

export const subscribe = payload => {
  return dispatch => {

    dispatch({
      type: ActionTypes.BUDGETS_SUBSCRIBE,  
    })
    
    const itemsRef = ref.child(`budgets/items`);
    itemsRef.on('value', snapshot => {
      const itemList = snapshot.val();

      dispatch({
        type: ActionTypes.BUDGETS_UPDATE,
        payload: { 
          itemList: itemList,
        }
      });
    });   
  };
}

export const search = payload => {
  return {
    type: ActionTypes.BUDGETS_SEARCH,
    payload,
  };
}

export const toggleColumn = payload => {
  return {
    type: ActionTypes.BUDGETS_TOGGLE_COL,
    payload,
  };
}

export const updateItem = payload => {
  return dispatch => {
    const itemRef = ref.child(`budgets/items/${payload.updatedItem.id}`);   

    itemRef.update(payload.updatedItem);

    dispatch({
      type: ActionTypes.BUDGETS_UPDATE_ITEM,
      payload,
    });
  };
}
