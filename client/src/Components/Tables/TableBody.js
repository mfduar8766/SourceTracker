import React from 'react';
import PropTypes from 'prop-types';

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

RenderTableBody.defaultProps = {
  handleDelete: () => {},
  handleEdit: () => {},
  showEditButton: true,
  showDeleteButton: true
};

RenderTableBody.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      prop: PropTypes.string
    })
  ).isRequired,
  tableDataArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  showEditButton: PropTypes.bool,
  showDeleteButton: PropTypes.bool,
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func,
  handleRowClick: PropTypes.func.isRequired
};

RenderTableRows.defaultProps = {
  handleDelete: () => {},
  handleEdit: () => {},
  showEditButton: true,
  showDeleteButton: true
};

RenderTableRows.propTypes = {
  classes: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  tableHeaders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      prop: PropTypes.string
    })
  ).isRequired,
  data: PropTypes.object.isRequired,
  showEditButton: PropTypes.bool,
  showDeleteButton: PropTypes.bool,
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func,
  handleRowClick: PropTypes.func.isRequired
};
