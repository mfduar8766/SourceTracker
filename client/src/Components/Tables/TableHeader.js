import React from 'react';
import PropTypes from 'prop-types';

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
          {selectedHeader === header.prop ? (
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
          ) : (
            header.prop === tableHeaders[0].prop &&
            sortDirection === 'asc' && (
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
            )
          )}
        </TableCell>
      ))}
      <TableCell />
    </TableRow>
  </TableHead>
);

RenderHeader.defaultProps = {
  selectedHeader: null
};

RenderHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      prop: PropTypes.string
    })
  ).isRequired,
  sortDirection: PropTypes.string.isRequired,
  toggleSortDirection: PropTypes.func.isRequired,
  selectedHeader: PropTypes.string
};
