import React, { useState, useEffect } from 'react';
import orderBy from 'lodash/orderBy';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/core/styles';

import { handleAscSort, handleDescSort } from './Utils/index';
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
  },
  cursorStyle: {
    cursor: 'pointer'
  }
});

const TableComponent = ({
  classes,
  tableHeaders,
  tableData,
  handleDelete,
  handleEdit,
  handleRowClick
}) => {
  const [sortDirection, setSortDirection] = useState('asc');
  const [tableDataArray, setTableDataArray] = useState(null);
  const [selectedHeader, setSelectedHeader] = useState(null);

  useEffect(() => {
    setTableDataArray(tableData);
  }, [tableData]);

  const toggleSortDirection = (event, header) => {
    event.preventDefault();
    setSortDirection(sortDirection =>
      sortDirection === 'asc' ? 'desc' : 'asc'
    );
    setSelectedHeader(header);
  };

  const handleSort = () => {
    switch (sortDirection) {
      case 'asc':
        return handleAscSort({
          tableDataArray,
          selectedHeader
        });
      case 'desc':
        return handleDescSort({
          tableDataArray,
          selectedHeader
        });
      default:
        return tableData;
    }
  };
  return (
    <Table className={classes.table}>
      <RenderHeader
        toggleSortDirection={toggleSortDirection}
        sortDirection={sortDirection}
        tableHeaders={tableHeaders}
        selectedHeader={selectedHeader}
        classes={classes}
      />
      <TableBody>
        {tableDataArray && tableDataArray.length && (
          <RenderTableBody
            classes={classes}
            tableHeaders={tableHeaders}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            tableDataArray={orderBy(handleSort())}
            handleRowClick={handleRowClick}
          />
        )}
      </TableBody>
    </Table>
  );
};

export default withStyles(tableStyles)(TableComponent);
