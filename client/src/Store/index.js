import { createContext } from 'react';
import { ADD_AGENGIES, ADD_USER, ADD_HISTORY, ADD_NEW_AGENCY } from './Types';

export const initialState = {
  agenciesArray: null,
  pathHistory: [],
  user: null
};

export const reducer = (state, action) => {
  const { type, newUser, agenciesArray, history, newAgency } = action;
  switch (type) {
    case ADD_AGENGIES:
      return {
        ...state,
        agenciesArray: agenciesArray
      };
    case ADD_NEW_AGENCY:
      return {
        ...state,
        agenciesArray: [...state.agenciesArray, newAgency]
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
