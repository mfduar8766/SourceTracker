import React from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';

import TableComponent from '../../Components/Tables/index';
import BarGraph from '../Graphs/BarGraphs';

const displaySearchResultsStyles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    marginTop: theme.spacing(5)
  },
  expansionPanel: {
    width: '100%',
    height: '100%'
  },
  flexRow: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  userInfo: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  membersInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

const repHeaders = [
  { id: 0, name: 'ID', prop: 'id' },
  { id: 1, name: 'First Name', prop: 'firstName' },
  { id: 2, name: 'Last Name', prop: 'lastName' },
  { id: 3, name: 'Start Date', prop: 'startDate' },
  { id: 4, name: 'End Date', prop: 'endDate' },
  { id: 5, name: 'Member Of', prop: 'correspondingAgency' },
  { id: 6, name: '', prop: '' }
];

const agentsHeaders = [
  { id: 0, name: 'Agent ID', prop: 'agentId' },
  { id: 1, name: 'First Name', prop: 'firstName' },
  { id: 2, name: 'Last Name', prop: 'lastName' },
  { id: 3, name: 'Members', prop: 'members' },
  { id: 4, name: 'Start Date', prop: 'startDate' },
  { id: 5, name: 'End Date', prop: 'endDate' },
  { id: 6, name: '', prop: '' }
];

const agencyHeaders = [
  { id: 0, name: 'Agency Id', prop: 'agencyId' },
  { id: 1, name: 'Agency Name', prop: 'agencyName' },
  { id: 2, name: 'City', prop: 'city' },
  { id: 3, name: 'State', prop: 'state' },
  { id: 4, name: 'Address', prop: 'address' },
  { id: 5, name: 'ZipCode', prop: 'zipCode' },
  { id: 6, name: 'Agents', prop: 'totalAgents' },
  { id: 7, name: '', prop: '' }
];

const barProps = [
  {
    id: 0,
    dataKey: 'Ancillary',
    fill: '#E3FF'
  },
  {
    id: 1,
    dataKey: 'Group',
    fill: '#E33'
  },
  {
    id: 2,
    dataKey: 'Over65',
    fill: '#CC3F'
  },
  {
    id: 3,
    dataKey: 'Under65',
    fill: '#82ca9d'
  }
];
const renderSearchResults = (resultsArray, classes) =>
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
            <img
              style={{ width: '2%', marginRight: '1rem' }}
              src={result.photo}
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
            tableHeaders={agentsHeaders}
            tableData={resultsArray.data}
            tableRowsPerPage={resultsArray.data.length}
            rowsPerPageOptions={[]}
          />
        )}
        {result.agencyId && (
          <TableComponent
            tableHeaders={agencyHeaders}
            tableData={resultsArray.data}
            tableRowsPerPage={resultsArray.data.length}
            rowsPerPageOptions={[]}
          />
        )}
        {result.id && (
          <TableComponent
            tableHeaders={repHeaders}
            tableData={resultsArray.data}
            tableRowsPerPage={resultsArray.data.length}
            rowsPerPageOptions={[]}
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

const checkSearchResults = (searchResult, classes) => {
  switch (searchResult.key) {
    case 'Agent':
      return renderSearchResults(searchResult, classes);
    case 'Agency':
      return renderSearchResults(searchResult, classes);
    case 'Member':
      return renderSearchResults(searchResult, classes);
    default:
      return null;
  }
};

const DisplaySearchResults = ({ classes, location }) => {
  const searchResults = location.state;
  const errorMessage = 'No records found.';
  const displaySearchResults = checkSearchResults(searchResults, classes);
  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={11}>
        <Paper className={classes.root}>
          {!displaySearchResults ? errorMessage : displaySearchResults}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default withStyles(displaySearchResultsStyles)(DisplaySearchResults);
