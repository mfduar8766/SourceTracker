import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/core/styles';
import { agentsTableStyles } from '../Utils/Styles';

const DisplayAgentsTable = ({
  agentsArray,
  classes,
  handleEdit,
  handleDelete,
  showAgentDetails
}) => (
  <TableBody>
    {agentsArray &&
      agentsArray.length &&
      agentsArray.map(agent => (
        <TableRow
          onClick={event => showAgentDetails(event, agent)}
          className={classes.tableRow}
          key={agent.agentId}
        >
          <TableCell align="left">{agent.agentId}</TableCell>
          <TableCell align="left">{agent.firstName}</TableCell>
          <TableCell align="left">{agent.lastName}</TableCell>
          <TableCell align="left">{agent.members}</TableCell>
          <TableCell align="left">{agent.startDate}</TableCell>
          <TableCell align="left">{agent.endDate}</TableCell>
          <TableCell>
            <FontAwesomeIcon
              className={classes.editButton}
              icon={faEdit}
              onClick={event => handleEdit(event, agent)}
            />
            <FontAwesomeIcon
              className={classes.deleteButton}
              icon={faTrashAlt}
              onClick={event => handleDelete(event, agent.agentId)}
            />
          </TableCell>
        </TableRow>
      ))}
  </TableBody>
);

export default withStyles(agentsTableStyles)(DisplayAgentsTable);
