export const dropDownValues = ['', 'Agencies', 'Members', 'Agents'];
const selectionValues = {
  EMPTY: '',
  AGENCIES: 'Agencies',
  AGENTS: 'Agents',
  MEMBERS: 'Members'
};

const filterByAgencies = globalState => {};

const filterByAgents = globalState => {};

const filterByMembers = globalState => {};

export const handleGlobalSearch = (queryString, globalState) => {
  const { EMPTY, AGENCIES, AGENTS, MEMBERS } = selectionValues;
  switch (queryString) {
    case AGENCIES:
      return filterByAgencies(globalState);
    case AGENTS:
      return filterByAgents(globalState);
    case MEMBERS:
      return filterByMembers(globalState);
    default:
      return EMPTY;
  }
};
