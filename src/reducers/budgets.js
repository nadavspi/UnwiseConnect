import { ActionTypes } from '../config/constants';

const initialState = {
	items: [
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
        column: "Development",
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
  ],
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
  ]
};

export default (state = initialState, action) => {
	switch(action.type) {
		case ActionTypes.BUDGETS_SUBSCRIBE:
			return {
				...state,
			};
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
			}
		case ActionTypes.BUDGETS_UPDATE_ITEM:
			return {
				...state,
				items: state.items.map(item => action.updatedItem.id === item.id ? action.updatedItem : item),
			}
		default:
			return state;
	}
};