export const commonSearch = (dataArray, queryString) => {
  const lowerCaseQueryString = queryString.toLowerCase().trim();
  const filteredAgents = [];
  let errorMessage;
  dataArray.some(data => {
    const dataValues = Object.values(data).flatMap(value =>
      value
        .toString()
        .toLowerCase()
        .trim()
    );
    if (!dataValues.includes(lowerCaseQueryString)) {
      errorMessage = 'No records found';
      return false;
    } else if (dataValues.includes(queryString)) {
      filteredAgents.push(data);
      return true;
    }
  });
  return filteredAgents && filteredAgents.length
    ? filteredAgents
    : errorMessage;
};
