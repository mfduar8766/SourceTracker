import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const RenderTableRows = ({
  classes,
  data,
  index,
  tableHeaders,
  handleEdit,
  handleDelete,
  handleRowClick
}) => (
  <TableRow className={classes.tableRow} key={index}>
    {tableHeaders.map(header => (
      <TableCell
        onClick={event => handleRowClick(event, data)}
        key={header.id}
      >
        {data[header.prop]}
      </TableCell>
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

export const RenderTableBody = ({
  classes,
  tableHeaders,
  tableDataArray,
  handleDelete,
  handleEdit,
  handleRowClick
}) => (
  <>
    {tableDataArray.map((data, index) => (
      <React.Fragment key={index}>
      <RenderTableRows
        classes={classes}
        data={data}
        index={index}
        tableHeaders={tableHeaders}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleRowClick={handleRowClick}
      />
      </React.Fragment>
    ))}
  </>
);
