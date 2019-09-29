import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';

export const RenderHeader = ({
  tableHeaders,
  sortDirection,
  toggleSortDirection,
  selectedHeader
}) => (
  <TableHead>
    <TableRow>
      {tableHeaders.map(header => (
        <TableCell key={header.id}>
          {header.name}
          <FontAwesomeIcon
            style={{ cursor: 'pointer' }}
            onClick={event => toggleSortDirection(event, header.prop)}
            icon={sortDirection === 'asc' ? faArrowUp : faArrowDown}
          />
        </TableCell>
      ))}
      <TableCell />
    </TableRow>
  </TableHead>
);
