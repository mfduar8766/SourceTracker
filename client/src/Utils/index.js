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
