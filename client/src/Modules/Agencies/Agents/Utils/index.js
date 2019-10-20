import axios from 'axios';
import moment from 'moment';

export const editAgent = async ({ EDIT_AGENT, agent }) => {
  const agentId = agent.agentId;
  const formatedAgentData = {
    ...agent,
    startDate: moment(agent.startDate).format('MM/DD/YYYY'),
    endDate: moment(agent.endDate).format('MM/DD/YYYY')
  };
  try {
    const res = await axios.patch(EDIT_AGENT(agentId), {
      data: formatedAgentData
    });
    return console.log(res);
  } catch (error) {
    return console.log(error);
  }
};

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

export const validateEditAgent = values => {
  const errors = {};
  if (values.startDate === '') {
    errors.startDate = 'Invalid date';
  } else if (values.endDate === '') {
    errors.endDate = 'Invalid';
  } else if (moment(values.startDate).isSameOrAfter(values.endDate)) {
    errors.startDate = 'Invalid date.';
  } else if (moment(values.endDate).isSameOrBefore(values.startDate)) {
    errors.endDate = 'Invalid date.';
  }
  return errors;
};
