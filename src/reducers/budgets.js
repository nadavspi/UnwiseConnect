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
      name: 'descriptions.clientResponsibilities',
      label: 'Client Responsibilities',
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
  userColumns: {
      summary: true,
      phase: true,
      feature: true,
      'budgetHours.column': true,
      'budgetHours.value': true,
      tags: true,
    },
};

export default (state = initialState, action) => {
	switch(action.type) {
		case ActionTypes.BUDGETS_ADD_ITEM:
			return {
				...state,
				items: [ 
					...state.items, 
					action.payload.item, 
				],
			};

		case ActionTypes.BUDGETS_REMOVE_ITEM:
			return {
				...state,
				items: state.items.filter(item => item.id !== action.payload.itemId)
			};

		case ActionTypes.BUDGETS_SEARCH:
			return {
				...state,
				query: action.payload.query,
			};

		case ActionTypes.BUDGETS_SUBSCRIBE:
			return {
				...state,
        items: action.payload,
			};

    case ActionTypes.BUDGETS_TOGGLE_COL:
      return {
        ...state,
        userColumns: {
          ...state.userColumns,
          [action.payload.columnName]: !state.userColumns[action.payload.columnName],
        }
      };

		case ActionTypes.BUDGETS_UPDATE_ITEM:
			return {
				...state,
				items: state.items.map(item => action.payload.updatedItem.id === item.id ? action.payload.updatedItem : item),
			};

		default:
			return state;
	}
};