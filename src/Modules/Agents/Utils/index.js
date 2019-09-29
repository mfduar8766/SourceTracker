export const tableHeaders = [
  { id: 0, name: 'Agent ID', prop: 'agentId' },
  { id: 1, name: 'First Name', prop: 'firstName' },
  { id: 2, name: 'Last Name', prop: 'lastName' },
  { id: 3, name: 'Members', prop: 'members' },
  { id: 4, name: 'Start Date', prop: 'startDate' },
  { id: 5, name: 'End Date', prop: 'endDate' },
  { id: 6, name: '', prop: '' }
];

export const agencySelectionValues = [
  { value: '', label: '' },
  { value: '200', label: 'Sample Agency I' },
  { value: '300', label: 'Sample Agency II' },
  { value: '400', label: 'Sample Agency III' },
  { value: '500', label: 'Sample Agency IV' },
  { value: '600', label: 'Sample Agency V' },
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
