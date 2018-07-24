import { ActionTypes, ref } from '../config/constants';
import { dispatchPlan } from '../helpers/cw';

export const addItem = payload => {
	return dispatch => {
		const itemRef =	ref.child(`items/${payload.item.id}`);

		itemRef.set( payload.item );
    dispatch({
			type: ActionTypes.BUDGETS_ADD,
			payload: {
        element: payload.item,
        elementType: 'itemList',
      },
		});
	};
}

export const addPreset = payload => {
  return dispatch => {
    const budgetRef = ref.child(`budgets/${payload.budget.id}`);

    budgetRef.set(payload.budget);
    dispatch({
      type: ActionTypes.BUDGETS_ADD,
      payload: {
        element: payload.budget,
        elementType: 'presets',
      },
    });
  };
}

export const createPlan = payload => {
  return dispatch => {
    dispatch ({
      type: ActionTypes.BUDGETS_DISPATCH_PLAN,
      payload,
    });

    dispatchPlan(payload).then(response => {
      dispatch({
        type: ActionTypes.BUDGETS_DISPATCH_PLAN_SUCCESS,
        payload: response,
      });
    });
  };
}

export const removeItem = payload => {
	return dispatch => {
		const itemRef =	ref.child(`items/${payload.itemId}`);

		itemRef.remove();

		dispatch({
			type: ActionTypes.BUDGETS_REMOVE,
			payload: {
        elementId: payload.itemId,
        elementType: 'itemList',
      },
		});
	};
}

export const removePreset = payload => {
  return dispatch => {
    const presetRef = ref.child(`budgets/${payload.elementId}`);

    presetRef.remove();

    dispatch({
      type: ActionTypes.BUDGETS_REMOVE,
      payload: {
        elementId: payload.elementId,
        elementType: 'presets',
      },
    });
  };
}

export const subscribe = payload => {
	return dispatch => {

		dispatch({
			type: ActionTypes.BUDGETS_SUBSCRIBE,	
		})
		
    const itemsRef = ref.child(`items`);
    itemsRef.on('value', snapshot => {
      const itemList = snapshot.val();

      dispatch({
	      type: ActionTypes.BUDGETS_UPDATE,
	      payload: { 
	        itemList,
          visibleItemList: itemList,
        }
      });
    });   
	};
}

export const subscribePresets = payload => {
  return dispatch => {
    const budgetRef = ref.child(`budgets`);
    budgetRef.on('value', snapshot => {
      const presets = snapshot.val();

      dispatch({
        type: ActionTypes.BUDGETS_UPDATE,
        payload: {
          presets,
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

export const swapState = payload => {
  return {
      type: ActionTypes.BUDGETS_SWAP_STATE,
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
		const itemRef =	ref.child(`items/${payload.updatedItem.id}`);		

		itemRef.update(payload.updatedItem);

		dispatch({
			type: ActionTypes.BUDGETS_UPDATE_ITEM,
			payload,	
		});
	};
}

export const updatePreset = payload => {
  return dispatch => {
    const presetRef = ref.child(`budgets/${payload.preset.id}`);

    presetRef.update(payload.preset);

    dispatch({
      type: ActionTypes.BUDGETS_ADD,
      payload: {
        elementType: 'presets',
        element: payload.preset,
      },  
    });
  };
}

