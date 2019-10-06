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
  { value: '600', label: 'Sample Agency V' }
];

export const getAgencyAndAgents = (agentsArray, agencyId) => {
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
