import React from 'react';
import PropTypes from 'prop-types';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import TableComponent from '../Tables/index';
import BarGraph from '../Graphs/BarGraphs';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const RenderSearchResults = ({ resultsArray, classes, headers, barProps }) =>
  resultsArray.data &&
  resultsArray.data.length &&
  resultsArray.data.map(result => (
    <ExpansionPanel
      expanded={true}
      key={result.agencyId || result.agentId || result.id}
      className={classes.expansionPanel}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div className={classes.flexRow}>
          {result.agentId && result.photo && (
            <FontAwesomeIcon
              size="2x"
              color="orange"
              style={{ marginRight: '0.5rem' }}
              icon={faUserCircle}
            />
          )}
          <Typography style={{ marginRight: '0.5rem' }}>
            {result.firstName || result.agencyName}
          </Typography>
          <Typography>
            {result.lastName || result.agencyId || result.id}
          </Typography>
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {result.agentId && (
          <TableComponent
            tableHeaders={headers.agentHeader}
            tableData={resultsArray.data}
            tableRowsPerPage={resultsArray.data.length}
            rowsPerPageOptions={[]}
            showEditButton={false}
            showDeleteButton={false}
          />
        )}
        {result.agencyId && (
          <TableComponent
            tableHeaders={headers.agencyHeader}
            tableData={resultsArray.data}
            tableRowsPerPage={resultsArray.data.length}
            rowsPerPageOptions={[]}
            showEditButton={false}
            showDeleteButton={false}
          />
        )}
        {result.id && (
          <TableComponent
            tableHeaders={headers.repHeader}
            tableData={resultsArray.data}
            tableRowsPerPage={resultsArray.data.length}
            rowsPerPageOptions={[]}
            showEditButton={false}
            showDeleteButton={false}
          />
        )}
        {result.agentId && (
          <div className={classes.membersInfo}>
            <Typography>Members Information</Typography>
            <BarGraph data={result.membersList} barProps={barProps} />
          </div>
        )}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  ));

RenderSearchResults.defaultProps = {
  barProps: [],
  resultsArray: [],
  headers: []
};

RenderSearchResults.propTypes = {
  barProps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      dataKey: PropTypes.string,
      fill: PropTypes.string
    })
  ),
  classes: PropTypes.object.isRequired,
  resultsArray: PropTypes.array,
  headers: PropTypes.array
};

export default RenderSearchResults;
