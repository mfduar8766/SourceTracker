import { commonSearch } from '../../../Utils/index';
const selectionValues = {
  EMPTY: '',
  AGENCIES: 'Agencies',
  AGENTS: 'Agents',
  MEMBERS: 'Members'
};

const filterByAgencies = (globalState, queryString) => {
  return commonSearch(globalState, queryString);
};

const filterByAgents = (globalState, queryString) => {
  const agents = globalState.flatMap(agent => agent.agents);
  return commonSearch(agents, queryString);
};

const filterByMembers = (globalState, queryString) => {
  const members = globalState
    .flatMap(agent => agent.agents)
    .flatMap(member => member.reps);
  return commonSearch(members, queryString);
};

export const handleGlobalSearch = (selectedValue, globalState, queryString) => {
  const { EMPTY, AGENCIES, AGENTS, MEMBERS } = selectionValues;
  switch (selectedValue) {
    case AGENCIES:
      return filterByAgencies(globalState, queryString);
    case AGENTS:
      return filterByAgents(globalState, queryString);
    case MEMBERS:
      return filterByMembers(globalState, queryString);
    default:
      return EMPTY;
  }
};
