import moment from 'moment';

export const formatDate = date => moment(date).format('MM/DD/YYYY');

export const GET_AGENCIES = '/api/v1/agencies';
export const GET_DROPDOWN_VALUES = '/api/v1/dropdown-values';
export const EDIT_AGENT = agentId => `/api/v1/agent/${agentId}`;
export const GET_AGENTS = '/api/v1/agents';

export const commonSearch = (dataArray, queryString) => {
  const lowerCaseQueryString = queryString.toLowerCase().trim();
  const filteredAgents = [];
  let errorMessage;
  dataArray.forEach(data => {
    Object.values(data)
      .flatMap(value =>
        value
          .toString()
          .toLowerCase()
          .trim()
      )
      .some(string => {
        if (!string.includes(lowerCaseQueryString)) {
          errorMessage = 'No records found.';
          return false;
        } else if (string.includes(lowerCaseQueryString)) {
          filteredAgents.push(data);
          return true;
        }
        return false;
      });
  });
  return filteredAgents && filteredAgents.length
    ? filteredAgents
    : errorMessage;
};
