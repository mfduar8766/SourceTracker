const sortingOptions = {
  LOW_TO_HIGH: 'Low to High',
  HIGHT_TO_LOW: 'High to Low',
  A_TO_Z: 'Last Name A-Z',
  Z_TO_A: 'Last Name Z-A'
};

export const agentsTableHeaders = [
  { name: 'Agent ID' },
  { name: 'First Name' },
  { name: 'Last Name' },
  { name: 'Members' },
  { name: 'Start Date' },
  { name: 'End Date' }
];

export const getAgencyAndAgents = ({ agentsArray, agencyId }) => {
  if (Array.isArray(agentsArray)) {
    if (!agencyId) {
      return agentsArray
        .filter(agency => agency.agencyId === 500)
        .flatMap(agent => agent.agents);
    }
    return agentsArray
      .filter(agency => agency.agencyId === agencyId)
      .flatMap(agent => agent.agents);
  }
  return [];
};

export const filterAgentSearch = ({ agentsArray, queryString }) => {
  const filteredAgents = [];
  agentsArray.forEach(agent => {
    const lowerCaseFirstName = agent.firstName.toLowerCase().trim();
    const lowerCaseLastName = agent.lastName.toLowerCase().trim();
    const agentId = agent.agentId
      .toString()
      .toLowerCase()
      .trim();
    const agentMembers = agent.members
      .toString()
      .toLowerCase()
      .trim();
    if (agentId.startsWith(queryString)) {
      filteredAgents.push(agent);
    } else if (lowerCaseFirstName.startsWith(queryString)) {
      filteredAgents.push(agent);
    } else if (lowerCaseLastName.startsWith(queryString)) {
      filteredAgents.push(agent);
    } else if (agentMembers.startsWith(queryString)) {
      filteredAgents.push(agent);
    }
    return [];
  });
  return filteredAgents && filteredAgents.length
    ? filteredAgents
    : 'No members found.';
};

const sortAtoZ = agents =>
  agents.sort((a, b) => a.lastName.localeCompare(b.lastName));

const sortZtoA = agents =>
  agents.sort((a, b) => b.lastName.localeCompare(a.lastName));

const sortHighToLow = agents => agents.sort((a, b) => b.members - a.members);

const sortLowToHigh = agents => agents.sort((a, b) => a.members - b.members);

export const sortAgents = (agents, valueToSort) => {
  const { LOW_TO_HIGH, HIGHT_TO_LOW, A_TO_Z, Z_TO_A } = sortingOptions;
  switch (valueToSort) {
    case HIGHT_TO_LOW:
      return sortHighToLow(agents);
    case LOW_TO_HIGH:
      return sortLowToHigh(agents);
    case A_TO_Z:
      return sortAtoZ(agents);
    case Z_TO_A:
      return sortZtoA(agents);
    default:
      return agents;
  }
};
