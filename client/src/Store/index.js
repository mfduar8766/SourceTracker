import { createContext } from 'react';
import { ADD_AGENGIES, ADD_USER, ADD_HISTORY } from './Types';

export const initialState = {
  agenciesArray: null,
  pathHistory: [],
  user: null
};

export const reducer = (state, action) => {
  const { type, newUser, agenciesArray, history } = action;
  switch (type) {
    case ADD_AGENGIES:
      return {
        ...state,
        agenciesArray: agenciesArray
      };
    case ADD_USER:
      return {
        ...state,
        user: newUser
      };
    case ADD_HISTORY:
      return {
        ...state,
        pathHistory: [...state.pathHistory, history]
      };
    default:
      return { ...state };
  }
};

export const StateContext = createContext();
