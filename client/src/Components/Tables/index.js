import React, { useState } from 'react';
import orderBy from 'lodash/orderBy';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/core/styles';

import {
  handleAscSort,
  handleDescSort,
  ASC,
  DESC,
  TableRow,
  TableCell
} from './Utils/index';
import { RenderHeader } from './TableHeader';
import { RenderTableBody } from './TableBody';
import { TableFooterComponent } from './TableFooter';
import LoadingIcon from '../LoadingIcon/index';

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
    cursor: 'pointer',
    marginLeft: '0.5rem'
  },
  addButton: {
    color: 'green',
    cursor: 'pointer',
    marginLeft: '1rem'
  },
  errorMessage: {
    display: 'flex',
    justifyContent: 'center',
    color: 'black'
  }
});

const TableComponent = ({
  classes,
  tableHeaders,
  tableData,
  handleDelete,
  handleEdit,
  handleRowClick,
  tableRowsPerPage,
  rowsPerPageOptions,
  showEditButton,
  showDeleteButton
}) => {
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedHeader, setSelectedHeader] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(tableRowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const toggleSortDirection = (event, header) => {
    event.preventDefault();
    setSortDirection(sortDirection =>
      sortDirection === 'asc' ? 'desc' : 'asc'
    );
    setSelectedHeader(header);
  };

  const handleSort = () => {
    switch (sortDirection) {
      case ASC:
        return handleAscSort({
          tableData,
          selectedHeader
        });
      case DESC:
        return handleDescSort({
          tableData,
          selectedHeader
        });
      default:
        return tableData;
    }
  };

  if (!tableData) {
    return <LoadingIcon color="primary" />;
  }

  if (tableData.length === 0) {
    return <div className={classes.errorMessage}>No records found.</div>
  }

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, tableData.length - page * rowsPerPage);

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
        {tableData && tableData.length && (
          <RenderTableBody
            classes={classes}
            tableHeaders={tableHeaders}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            tableDataArray={orderBy(handleSort())}
            handleRowClick={handleRowClick}
            showEditButton={showEditButton}
            showDeleteButton={showDeleteButton}
          />
        )}
        {emptyRows > 0 && (
          <TableRow style={{ height: 48 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )}
      </TableBody>
      <TableFooterComponent
        rowsPerPageOptions={rowsPerPageOptions}
        tableDataArray={tableData}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Table>
  );
};

export default withStyles(tableStyles)(TableComponent);
