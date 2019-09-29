import React, { useState, useEffect } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/core/styles';

import { RenderHeader } from './TableHeader';
import { RenderTableBody } from './TableBody';

const tableStyles = () => ({
  table: {
    width: '100%',
    height: '100%'
  },
  editButton: {
    color: 'blue',
    cursor: 'pointer'
  },
  deleteButton: {
    color: 'red',
    cursor: 'pointer',
    marginLeft: '1rem'
  },
  tableRow: {
    cursor: 'pointer',
    width: '100%',
    height: '100%'
  }
});

const handleAscSort = ({
  tableDataArray,
  selectedHeader,
  setTableDataArray
}) => {};

const handleDescSort = ({
  tableDataArray,
  selectedHeader,
  setTableDataArray
}) => {
  const sortDesc = tableDataArray.sort((a, b) => {
    console.log(selectedHeader);
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
  console.log(sortDesc);
  return setTableDataArray(sortDesc);
};

const TableComponent = ({
  classes,
  tableHeaders,
  tableData,
  handleDelete,
  handleEdit
}) => {
  const [sortDirection, setSortDirection] = useState('asc');
  const [tableDataArray, setTableDataArray] = useState(null);
  const [selectedHeader, setSelectedHeader] = useState(null);

  useEffect(() => {
    setTableDataArray(tableData);
  }, []);

  const toggleSortDirection = (event, header) => {
    event.preventDefault();
    setSortDirection(sortDirection =>
      sortDirection === 'asc' ? 'desc' : 'asc'
    );
    setSelectedHeader(header);
    handleSort({ selectedHeader, sortDirection });
  };

  const handleSort = ({ selectedHeader, sortDirection }) => {
    switch (sortDirection) {
      case 'asc':
        return handleAscSort({
          tableDataArray,
          selectedHeader,
          setTableDataArray
        });
      case 'desc':
        return handleDescSort({
          tableDataArray,
          selectedHeader,
          setTableDataArray
        });
      default:
        return setTableDataArray(tableData);
    }
  };
  console.log(sortDirection);
  return (
    <Table className={classes.table}>
      <RenderHeader
        toggleSortDirection={toggleSortDirection}
        sortDirection={sortDirection}
        tableHeaders={tableHeaders}
        selectedHeader={selectedHeader}
      />
      <TableBody>
        {tableDataArray &&
          tableDataArray.length &&
          tableDataArray.map((data, index) => (
            <RenderTableBody
              classes={classes}
              key={index}
              tableHeaders={tableHeaders}
              data={data}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
      </TableBody>
    </Table>
  );
};

export default withStyles(tableStyles)(TableComponent);
