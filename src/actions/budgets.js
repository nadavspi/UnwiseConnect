import { ActionTypes } from '../config/constants';

export const addItem = payload => {
	return {
		type: ActionTypes.BUDGETS_ADD_ITEM,
		payload,
	}
}

export const removeItem = payload => {
	return {
		type: ActionTypes.BUDGETS_REMOVE_ITEM,
		payload,
	}
}

export const subscribe = payload => {
	return {
		type: ActionTypes.BUDGETS_SUBSCRIBE,	
		payload,
	}
}

export const search = payload => {
	return {
		type: ActionTypes.BUDGETS_SEARCH,
		payload,
	}
}

export const toggleColumn = payload => {
	return {
		type: ActionTypes.BUDGETS_TOGGLE_COL,
		payload,
	}
}

export const updateItem = payload => {
	return {
		type: ActionTypes.BUDGETS_UPDATE_ITEM,
		payload,
	}
}