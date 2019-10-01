import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import {
  getAgencyAndAgents,
  filterAgentSearch,
  tableHeaders,
  agencySelectionValues
} from './Utils/index';
import orderBy from 'lodash/orderBy';
import { agentsTableStyles } from './Utils/Styles';

import AgentSearch from './Components/AgentSearch/index';
import EditAgentsModal from './Components/Modals/EditAgents/index';
import BreadCrumbComponent from '../../Components/BreadCrumbs/index';
import TableComponent from '../../Components/Tables/index';
import WarningModal from '../../Components/Modals/WarningModal';
import LoadingIcon from '../../Components/LoadingIcon/index';

const modalWidth = 600;
const modalHeight = 100;

const AgentsTable = ({ classes, history }) => {
  const [agentsArray, setAgentsArray] = useState(null);
  const [queryString, setQueryString] = useState('');
  const [selectedAgency, setSelectedAgency] = useState('');
  const [isEditOn, setIsEditOn] = useState(false);
  const [agentToEdit, setAgentToEdit] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isDeleteModalOn, setIsDeleteModalOn] = useState(false);
  const [agentToDelete, setAgentToDelete] = useState(null);
  const [allAgencies, setAllAgencies] = useState(null);

  const fetchAgencies = async () => {
    try {
      const agenciesArray = axios.get('agencies.json');
      const response = await agenciesArray;
      const agentsArray = response.data;
      setAllAgencies(agentsArray);
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
    const agentsArray = allAgencies;
    setAgentsArray(getAgencyAndAgents({ agentsArray, agencyId }));
  };

  const handleEdit = (event, agent) => {
    event.preventDefault();
    setIsEditOn(true);
    setAgentToEdit(agent);
  };

  const closeModal = () => setIsEditOn(false);

  const toggleDeleteModal = () => {
    setIsDeleteModalOn(isDeleteModalOn => !isDeleteModalOn);
    setAgentToDelete(null);
  };

  const handleDelete = (event, agent) => {
    event.preventDefault();
    setAgentToDelete(agent);
    setIsDeleteModalOn(true);
  };

  const deleteAgent = () => {
    const { agentId } = agentToDelete;
    const filteredAgents = agentsArray.filter(
      agent => agent.agentId !== agentId
    );
    setIsDeleteModalOn(false);
    setAgentsArray(filteredAgents);
  };

  const showAgentDetails = (event, agent) => {
    event.preventDefault();
    history.push(`/agent/:${agent.agentId}`, agent);
  };

  const getEditAgentFormValues = values => {
    // TODO: Create service for editing agents.
  };

  if (!agentsArray) {
    return <LoadingIcon color="primary" />
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
          {isDeleteModalOn && (
            <WarningModal
              modalWidth={modalWidth}
              modalHeight={modalHeight}
              isDeleteModalOn={isDeleteModalOn}
              toggleDeleteModal={toggleDeleteModal}
              deleteAgent={deleteAgent}
            />
          )}
          {isEditOn && agentToEdit && (
            <EditAgentsModal
              agentToEdit={agentToEdit}
              isEditOn={isEditOn}
              getEditAgentFormValues={getEditAgentFormValues}
              closeModal={closeModal}
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
                tableRowsPerPage={5}
                rowsPerPageOptions={[5, 10, 15]}
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default withRouter(withStyles(agentsTableStyles)(AgentsTable));
