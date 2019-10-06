import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import { TableRow, TableCell } from './Utils/index';

const RenderTableRows = ({
  classes,
  data,
  index,
  tableHeaders,
  handleEdit,
  handleDelete,
  handleRowClick,
  showEditButton,
  showDeleteButton
}) => (
  <TableRow className={classes.tableRow} key={index}>
    {tableHeaders.map(header => (
      <TableCell onClick={event => handleRowClick(event, data)} key={header.id}>
        {data[header.prop]}
      </TableCell>
    ))}
    <TableCell>
      {showEditButton && (
        <FontAwesomeIcon
        className={classes.editButton}
        icon={faEdit}
        onClick={event => handleEdit(event, data)}
      />
      )}
      {showDeleteButton && (
        <FontAwesomeIcon
        className={classes.deleteButton}
        icon={faTrashAlt}
        onClick={event => handleDelete(event, data)}
      />
      )}
    </TableCell>
  </TableRow>
);

export const RenderTableBody = ({
  classes,
  tableHeaders,
  tableDataArray,
  handleDelete,
  handleEdit,
  handleRowClick,
  showEditButton,
  showDeleteButton
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
          showEditButton={showEditButton}
          showDeleteButton={showDeleteButton}
        />
      </React.Fragment>
    ))}
  </>
);
