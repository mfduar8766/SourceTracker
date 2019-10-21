import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import {
  getAgencyAndAgents,
  tableHeaders,
  agencySelectionValues,
} from './Utils/index';
import orderBy from 'lodash/orderBy';
import { agentsTableStyles } from './Utils/Styles';
import { editAgentById } from './Services/index';

import AgentSearch from './Components/AgentSearch/index';
import TableComponent from '../../../Components/Tables/index';
import WarningModal from '../../../Components/Modals/WarningModal';
import LoadingIcon from '../../../Components/LoadingIcon/index';
import CommonModal from '../../../Components/Modals/index';
import { EDIT_AGENT } from '../../../Utils/index';
import { commonSearch, formatDate } from '../../../Utils/index';
import { StateContext } from '../../../Store/index';
import EditAgentForm from './Components/EditAgentForm';

const modalWidth = 600;
const modalHeight = 100;

const AgentsTable = ({ classes, history, location }) => {
  const { store } = useContext(StateContext);
  const [agentsArray, setAgentsArray] = useState(null);
  const [queryString, setQueryString] = useState('');
  const [selectedAgency, setSelectedAgency] = useState('');
  const [isEditOn, setIsEditOn] = useState(false);
  const [agentToEdit, setAgentToEdit] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isDeleteModalOn, setIsDeleteModalOn] = useState(false);
  const [agentToDelete, setAgentToDelete] = useState(null);
  const agenciesArray = store.agenciesArray;

  useEffect(() => {
    setAgentsArray(location.state);
  }, [location.state]);

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

  const getEditAgentFormValues = agent => {
    const agentId = agent.agentId;
    const updatedAgents = agentsArray.map(data => {
      if (data.agentId === agentId) {
        const startDate = agent.startDate;
        const endDate = agent.endDate;
        return {
          ...data,
          startDate: formatDate(startDate),
          endDate: formatDate(endDate)
        };
      }
      return data;
    });
    setAgentsArray(updatedAgents);
    return editAgentById({ EDIT_AGENT, agent });
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
          <CommonModal
            isOpen={isEditOn}
            toggleOpenModal={closeModal}
            children={
              <EditAgentForm
                agentToEdit={agentToEdit}
                getEditAgentFormValues={getEditAgentFormValues}
                closeModal={closeModal}
              />
            }
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
            />
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

AgentsTable.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(withStyles(agentsTableStyles)(AgentsTable));
