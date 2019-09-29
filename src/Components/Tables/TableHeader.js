import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';

export const RenderHeader = ({
  classes,
  tableHeaders,
  sortDirection,
  toggleSortDirection,
  selectedHeader
}) => (
  <TableHead>
    <TableRow>
      {tableHeaders.map(header => (
        <TableCell
          className={classes.cursorStyle}
          key={header.id}
          onClick={event => toggleSortDirection(event, header.prop)}
        >
          {header.name}
          {selectedHeader === header.prop && (
            <FontAwesomeIcon
              className={classes.cursorStyle}
              icon={
                sortDirection === 'asc'
                  ? faArrowUp
                  : sortDirection === 'desc'
                  ? faArrowDown
                  : null
              }
            />
          )}
        </TableCell>
      ))}
      <TableCell />
    </TableRow>
  </TableHead>
);
