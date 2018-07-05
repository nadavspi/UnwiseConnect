import { ActionTypes } from '../config/constants';

const initialState = {
	items: [],
  fields: [
    {
      filterType: 'textfield',
      name: 'summary',
      label: 'Summary',
      type: 'text',
      required: true,
    },
    {
      filterType: 'textfield',
      name: 'phase',
      label: 'Phase',
      type: 'text',
      required: true,
    },
    {
      filterType: 'textfield',
      name: 'feature',
      label: 'Feature',
      type: 'text',
    },
    {
      filterType: 'textfield',
      name: 'budgetHours.column',
      label: 'Team',
      type: 'text',
    },
    {
      filterType: 'textfield',
      name: 'budgetHours.value',
      label: 'Hours',
      type: 'number',
    },
    {
      filterType: 'none',
      name: 'descriptions.workplan',
      label: 'Workplan description',
      type: 'text',
      required: true,
    },
    {
      filterType: 'none',
      name: 'descriptions.budget',
      label: 'Budget description',
      type: 'text',
    },
    {
      filterType: 'none',
      name: 'descriptions.assumptions',
      label: 'Assumptions',
      type: 'text',
    },
    {
      filterType: 'none',
      name: 'descriptions.exclusions',
      label: 'Exclusions',
      type: 'text',
    },
    {
      filterType: 'custom',
      name: 'tags',
      label: 'Tags',
      type: 'text',
      required: true,
    },
  ],
  query: {},
};

export default (state = initialState, action) => {
	switch(action.type) {
		case ActionTypes.BUDGETS_ADD_ITEM:
			return {
				...state,
				items: [ 
					...state.items, 
					action.item, 
				],
			};

		case ActionTypes.BUDGETS_REMOVE_ITEM:
			return {
				...state,
				items: state.items.filter(item => item.id !== action.itemId)
			};

		case ActionTypes.BUDGETS_SEARCH:
			return {
				...state,
				query: action.query,
			};

		case ActionTypes.BUDGETS_SUBSCRIBE:
			return {
				...state,
        items: action.payload,
			};

		case ActionTypes.BUDGETS_UPDATE_ITEM:
			return {
				...state,
				items: state.items.map(item => action.updatedItem.id === item.id ? action.updatedItem : item),
			};

		default:
			return state;
	}
};