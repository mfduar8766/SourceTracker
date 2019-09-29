import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import {
  getAgencyAndAgents,
  filterAgentSearch,
  tableHeaders,
  agencySelectionValues
} from './Utils/index';
import AgentSearch from './Components/AgentSearch/index';
import EditAgentsModal from './Components/Modals/EditAgents/index';
import orderBy from 'lodash/orderBy';
import { agentsTableStyles } from './Utils/Styles';

import BreadCrumbComponent from '../../Components/BreadCrumbs/index';
import TableComponent from '../../Components/Tables/index';

const AgentsTable = ({ classes, history }) => {
  const [agentsArray, setAgentsArray] = useState(null);
  const [queryString, setQueryString] = useState('');
  const [selectedAgency, setSelectedAgency] = useState('');
  const [isEditOn, setIsEditOn] = useState(false);
  const [agentToEdit, setAgentToEdit] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchAgencies = async () => {
    try {
      const agenciesArray = axios.get('agencies.json');
      const response = await agenciesArray;
      const agentsArray = response.data;
      return setAgentsArray(getAgencyAndAgents({ agentsArray }));
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchAgencies();
  }, []);

  const getQueryString = event => {
    const lowerCaseQuery = event.target.value.toLowerCase().trim();
    if (lowerCaseQuery.length === 0) {
      setQueryString('');
      setErrorMessage(null);
    } else if (lowerCaseQuery.length >= 1) {
      setQueryString(lowerCaseQuery);
    }
  };

  const getFilteredAgents = ({ agentsArray, queryString }) => {
    const searchResults = filterAgentSearch({ agentsArray, queryString });
    if (Array.isArray(searchResults)) {
      return searchResults;
    }
    return setErrorMessage(searchResults);
  };

  const returnSearchResults = ({ agentsArray, queryString }) => {
    if (queryString.length === 0) {
      return agentsArray;
    }
    const searchResults = getFilteredAgents({ agentsArray, queryString });
    return searchResults;
  };

  const handleAgencySelection = event => {
    const agencyId = parseInt(event.target.value);
    setSelectedAgency(agencyId);
    setAgentsArray(getAgencyAndAgents({ agentsArray, agencyId }));
  };

  const handleEdit = (event, agent) => {
    event.preventDefault();
    setIsEditOn(isEditOn => !isEditOn);
    setAgentToEdit(agent);
  };

  const handleDelete = (event, agent) => {
    event.preventDefault();
    const { agentId } = agent;
    const filteredAgents = agentsArray.filter(
      agent => agent.agentId !== agentId
    );
    setAgentsArray(filteredAgents);
  };

  const showAgentDetails = (event, agent) => {
    event.preventDefault();
    history.push(`/agent/${agent.agentId}`, agent);
  };

  const submitForm = values => {
  };

  if (!agentsArray) {
    return (
      <div className={classes.loadingIcon}>
        <CircularProgress color="primary" />
      </div>
    );
  }
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginLeft: '5rem'
        }}
      >
        <BreadCrumbComponent location={history.location.pathname} />
      </div>
      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid item xs={11}>
          {isEditOn && agentToEdit && (
            <EditAgentsModal
              agentToEdit={agentToEdit}
              isEditOn={isEditOn}
              handleEdit={handleEdit}
              submitForm={submitForm}
            />
          )}
          <Paper className={classes.root}>
            <AgentSearch
              getQueryString={getQueryString}
              agencyDropDownValues={agencySelectionValues}
              handleAgencySelection={handleAgencySelection}
              selectedAgency={selectedAgency}
            />
            {errorMessage ? (
              <div className={classes.errorMessage}>{errorMessage}</div>
            ) : (
              <TableComponent
                tableHeaders={tableHeaders}
                tableData={orderBy(
                  returnSearchResults({ agentsArray, queryString })
                )}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                handleRowClick={showAgentDetails}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default withRouter(withStyles(agentsTableStyles)(AgentsTable));
