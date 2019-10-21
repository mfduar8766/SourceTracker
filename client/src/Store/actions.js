import { ADD_AGENGIES, ADD_HISTORY, ADD_NEW_AGENCY, ADD_USER } from './Types';

export const getAgencies = ({ agenciesArray }) => ({
  type: ADD_AGENGIES,
  agenciesArray
});

export const addUser = ({ newUser }) => ({
  type: ADD_USER,
  newUser
});

export const addNewAgencyAction = ({ newAgency }) => ({
  type: ADD_NEW_AGENCY,
  newAgency
});
