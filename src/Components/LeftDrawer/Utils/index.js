import { commonSearch } from '../../../Utils/index';

export const dropDownValues = ['', 'Agencies', 'Members', 'Agents'];
const selectionValues = {
  EMPTY: '',
  AGENCIES: 'Agencies',
  AGENTS: 'Agents',
  MEMBERS: 'Members'
};

const filterByAgencies = (globalState, queryString) => {
  return commonSearch(globalState, queryString);
};

const filterByAgents = globalState => {};

const filterByMembers = globalState => {};

export const handleGlobalSearch = (selectedValue, globalState, queryString) => {
  const { EMPTY, AGENCIES, AGENTS, MEMBERS } = selectionValues;
  switch (selectedValue) {
    case AGENCIES:
      return filterByAgencies(globalState, queryString);
    case AGENTS:
      return filterByAgents(globalState);
    case MEMBERS:
      return filterByMembers(globalState);
    default:
      return EMPTY;
  }
};
