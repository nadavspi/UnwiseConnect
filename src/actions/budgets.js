import { ActionTypes, ref } from '../config/constants';

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
      
    const inputData = [
        {
          id: 1,
          summary: "Klevu discovery & calls",
          phase: "dev/Klevu",
          feature: "Klevu",
          budgetHours: { 
            column: "Discovery",
            value: 6,
          },
          descriptions: {
            workplan: [
              "Time for communication with Klevu.",
            ],
            budget: [],
            assumptions: [
              "Accounts for one onboarding call."
            ],
            exclusions: [],
          },
          tags: "klevu",
        },
        {
          id: 2,
          summary: "Install Klevu extension",
          phase: "dev/Klevu",
          feature: "Klevu",
          budgetHours: { 
            column: 'Dev',
            value: 4,
          },
          descriptions: {
            workplan: [
              "Install Klevu extension using composer.",
            ],
            assumptions: [
              "Install extension once using code provided by Klevu."
            ],
          },
          tags: "klevu",
        },
        {
          id: 3,
          summary: "Configure Klevu flyout",
          phase: "dev/Klevu",
          feature: "Klevu",
          budgetHours: { 
            column: 'Dev',
            value: 4,
          },
          descriptions: {
            workplan: [
              "Use Klevu control panel to choose between autocomplete and faceted.",
            ],
            assumptions: [
              "Use one of out of box options provided by Klevu (autocomplete or faceted) without customization.",
            ],
          },
          tags: "klevu",
        },
        {
          id: 10,
          summary: "Development meetings",
          phase: "dev",
          feature: "Build",
          budgetHours: { 
            column: "Dev",
            value: 20,
          },
          descriptions: {
            workplan: [],
            budget: [],
            assumptions: [],
            exclusions: [],
          },
          tags: "build",
        },
    ];
    dispatch({
      type: ActionTypes.BUDGETS_UPDATE,
      payload: { 
        itemList: inputData,
      }
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
