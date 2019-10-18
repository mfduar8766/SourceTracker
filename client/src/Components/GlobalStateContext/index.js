import { createContext } from 'react';

export const GlobalStateContext = createContext({
  agenciesArray: null,
  pathHistory: [],
  user: 'agencyOwner'
});
