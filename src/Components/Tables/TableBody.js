import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export const RenderTableBody = ({
  classes,
  key,
  tableHeaders,
  data,
  handleDelete,
  handleEdit
}) => (
  <TableRow className={classes.tableRow} key={key}>
    {tableHeaders.map(header => (
      <TableCell key={data[header.prop]}>{data[header.prop]}</TableCell>
    ))}
    <TableCell>
      <FontAwesomeIcon
        className={classes.editButton}
        icon={faEdit}
        onClick={event => handleEdit(event, data)}
      />
      <FontAwesomeIcon
        className={classes.deleteButton}
        icon={faTrashAlt}
        onClick={event => handleDelete(event, data)}
      />
    </TableCell>
  </TableRow>
);
