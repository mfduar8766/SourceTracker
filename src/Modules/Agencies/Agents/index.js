import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import {
  getAgencyAndAgents,
  tableHeaders,
  agencySelectionValues
} from './Utils/index';
import orderBy from 'lodash/orderBy';
import { agentsTableStyles } from './Utils/Styles';

import AgentSearch from './Components/AgentSearch/index';
import EditAgentsModal from './Components/Modals/EditAgents/index';
import TableComponent from '../../../Components/Tables/index';
import WarningModal from '../../../Components/Modals/WarningModal';
import LoadingIcon from '../../../Components/LoadingIcon/index';
import { commonSearch } from '../../../Utils/index';
import { GlobalStateContext } from '../../../Components/GlobalStateContext/index';

const modalWidth = 600;
const modalHeight = 100;

const AgentsTable = ({ classes, history, location }) => {
  const [agentsArray, setAgentsArray] = useState(null);
  const [queryString, setQueryString] = useState('');
  const [selectedAgency, setSelectedAgency] = useState('');
  const [isEditOn, setIsEditOn] = useState(false);
  const [agentToEdit, setAgentToEdit] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isDeleteModalOn, setIsDeleteModalOn] = useState(false);
  const [agentToDelete, setAgentToDelete] = useState(null);
  const { agenciesArray } = useContext(GlobalStateContext);

  const checkIncomingData = () => setAgentsArray(location.state);

  useEffect(() => {
    checkIncomingData();
  }, []);

  if (!agentsArray) {
    return <LoadingIcon color="primary" />;
  }

  const handleAgencySelection = event => {
    const agencyId = parseInt(event.target.value);
    setSelectedAgency(agencyId);
    setAgentsArray(getAgencyAndAgents(agenciesArray, agencyId));
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

  const handleRowClick = (event, agent) => {
    event.preventDefault();
    history.push(`/agent-details/agent/${agent.agentId}`, {
      key: 'Agent',
      data: [agent]
    });
  };

  const getEditAgentFormValues = values => {
    // TODO: Create service for editing agents.
  };

  const handleSearch = event => {
    if (event.target.value.length >= 1) {
      setQueryString(event.target.value);
    }
    setQueryString(event.target.value);
    setErrorMessage(null);
  };

  const getFilteredAgents = ({ agentsArray, queryString }) => {
    const searchResults = commonSearch(agentsArray, queryString);
    if (Array.isArray(searchResults)) {
      return searchResults;
    }
    return setErrorMessage(searchResults);
  };

  const getSearchedAgent = () => {
    if (queryString.length === 0) {
      return agentsArray;
    }
    const searchResults = getFilteredAgents({ agentsArray, queryString });
    return searchResults;
  };
  return (
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
            handleSearch={handleSearch}
            agencyDropDownValues={agencySelectionValues}
            handleAgencySelection={handleAgencySelection}
            selectedAgency={selectedAgency}
          />
          {errorMessage ? (
            <div className={classes.errorMessage}>{errorMessage}</div>
          ) : (
            <TableComponent
              tableHeaders={tableHeaders}
              tableData={orderBy(getSearchedAgent())}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleRowClick={handleRowClick}
              tableRowsPerPage={5}
              rowsPerPageOptions={[5, 10, 15]}
            />
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};
export default withRouter(withStyles(agentsTableStyles)(AgentsTable));
