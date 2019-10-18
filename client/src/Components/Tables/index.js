import React, { useState } from 'react';
import orderBy from 'lodash/orderBy';
import PropTypes from 'prop-types';

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
import { tableStyles } from './Utils/Styles';

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
    return <div className={classes.errorMessage}>No records found.</div>;
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
        rowsperpageoptions={rowsPerPageOptions}
        tableDataArray={tableData}
        rowsperpage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Table>
  );
};

TableComponent.defaultProps = {
  handleDelete: () => {},
  handleEdit: () => {},
  tableRowsPerPage: 5,
  rowsPerPageOptions: [5, 10, 15],
  showEditButton: true,
  showDeleteButton: true
};

TableComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      prop: PropTypes.string
    })
  ).isRequired,
  tableRowsPerPage: PropTypes.number,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  showEditButton: PropTypes.bool,
  showDeleteButton: PropTypes.bool,
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func,
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleRowClick: PropTypes.func.isRequired
};

export default withStyles(tableStyles)(TableComponent);
