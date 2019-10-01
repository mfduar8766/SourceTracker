import React from 'react';

import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import { TableRow } from './Utils/index';
import { TablePaginationActions } from './TablePagination';

export const TableFooterComponent = ({
  rowsPerPageOptions,
  tableDataArray,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage
}) => (
  <TableFooter>
    <TableRow>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        colSpan={9}
        count={tableDataArray.length}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
          inputProps: { 'aria-label': 'rows per page' },
          native: true
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </TableRow>
  </TableFooter>
);
