import React from 'react';
import PropTypes from 'prop-types';

import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import { TableRow } from './Utils/index';
import { TablePaginationActions } from './TablePagination';

export const TableFooterComponent = ({
  rowsperpageoptions,
  tableDataArray,
  rowsperpage,
  page,
  handleChangePage,
  handleChangeRowsPerPage
}) => (
  <TableFooter>
    <TableRow>
      <TablePagination
        rowsPerPageOptions={rowsperpageoptions}
        colSpan={9}
        count={tableDataArray.length}
        rowsPerPage={rowsperpage}
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

TableFooter.defaultProps = {
  rowsperpageoptions: [5, 10, 15],
  rowsperpage: 5
};

TableFooter.propTypes = {
  rowsperpageoptions: PropTypes.arrayOf(PropTypes.number),
  tableDataArray: PropTypes.arrayOf(PropTypes.object),
  rowsperpage: PropTypes.number,
  page: PropTypes.number,
  handleChangePage: PropTypes.func,
  handleChangeRowsPerPage: PropTypes.func
};
