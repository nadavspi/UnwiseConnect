import { ActionTypes } from '../config/constants';

const getThemeFromLocalStorage = () => {
  try {
    return localStorage.getItem('theme');
  } catch(e) {
    return 'light';
  }
}

const initialState = {
  error: undefined,
  loading: true,
  theme: getThemeFromLocalStorage()
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SIGN_IN:
      return {
        ...state,
        error: false,
        loading: false,
      };

    case ActionTypes.LOADED: 
      return {
        ...state,
        loading: false,
      };

    case ActionTypes.ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case ActionTypes.THEME:
      return {
        ...state,
        theme: action.payload,
      };

    default: 
      return state;
  }
}
