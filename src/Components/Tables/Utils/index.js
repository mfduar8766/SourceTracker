export const ASC = 'asc';
export const DESC = 'desc';

export const handleAscSort = ({
  tableDataArray,
  selectedHeader,
}) => {
  return tableDataArray.sort((a, b) => {
    if (
      typeof a[selectedHeader] === 'number' ||
      typeof b[selectedHeader] === 'number'
    ) {
      return a[selectedHeader] - b[selectedHeader];
    } else if (
      typeof a[selectedHeader] === 'string' ||
      typeof b[selectedHeader] === 'string'
    ) {
      return a[selectedHeader].localeCompare(b[selectedHeader]);
    }
  });
};

export const handleDescSort = ({
  tableDataArray,
  selectedHeader,
}) => {
  return tableDataArray.sort((a, b) => {
    if (
      typeof a[selectedHeader] === 'number' ||
      typeof b[selectedHeader] === 'number'
    ) {
      return b[selectedHeader] - a[selectedHeader];
    } else if (
      typeof a[selectedHeader] === 'string' ||
      typeof b[selectedHeader] === 'string'
    ) {
      return b[selectedHeader].localeCompare(a[selectedHeader]);
    }
  });
};