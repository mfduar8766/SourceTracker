import { TableRow as Row } from '@material-ui/core';
import { TableCell as Cells } from '@material-ui/core';

export const TableRow = Row;
export const TableCell = Cells;
export const ASC = 'asc';
export const DESC = 'desc';

export const handleAscSort = ({ tableData, selectedHeader }) =>
  tableData.sort((a, b) => {
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
    return null;
  });

export const handleDescSort = ({ tableData, selectedHeader }) =>
  tableData.sort((a, b) => {
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
    return null;
  });
