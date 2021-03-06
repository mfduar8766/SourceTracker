import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import orderBy from 'lodash/orderBy';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import TableComponent from '../../Components/Tables/index';
import { agencyHeaders } from './Utils/index';
import LoadingIcon from '../../Components/LoadingIcon';
import Button from '../../Components/Buttons/index';
import SearchComponent from '../../Components/Search/index';
import { setModalStyle } from '../../Components/GlobalStyles';
import { commonSearch } from '../../Utils/index';
import CommonModal from '../../Components/Modals/index';
import AddAgenciesForm from './Components/AddAgenciesForm';
import { StateContext } from '../../Store/index';
import { addNewAgencyAction } from '../../Store/actions';

const agenciesTableStyles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    marginTop: theme.spacing(3)
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: '1rem'
  }
});

const AgenciesView = ({ classes, history }) => {
  const { store, dispatch } = useContext(StateContext);
  const [agenciesArray, setAgenciesArray] = useState(null);
  const [queryString, setQueryString] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setAgenciesArray(store.agenciesArray);
  }, [store.agenciesArray]);

  if (!agenciesArray) {
    return <LoadingIcon color="primary" />;
  }

  const toggleOpenModal = () => setIsOpen(isOpen => !isOpen);

  const handleRowClick = (event, data) => {
    event.preventDefault();
    history.push(
      `/agencies/${data.agencyName}/${data.agencyId}/agents`,
      data.agents
    );
  };

  const handleSearch = event => {
    if (event.target.value.length >= 1) {
      commonSearch(agenciesArray, event.target.value);
      setQueryString(event.target.value);
    }
    setQueryString(event.target.value);
    setErrorMessage(null);
  };

  const getFilteredAgents = () => {
    const searchResults = commonSearch(agenciesArray, queryString);
    if (Array.isArray(searchResults)) {
      return searchResults;
    }
    return setErrorMessage(searchResults);
  };

  const getSearchedAgency = () => {
    if (queryString.length === 0) {
      return store.agenciesArray;
    }
    const searchResults = getFilteredAgents();
    return searchResults;
  };

  const getNewAgency = agency => {
    const newAgency = agency;
    dispatch(addNewAgencyAction({ newAgency }));
  };

  return (
    <Grid container spacing={3} justify="center" alignItems="center">
      {isOpen && (
        <CommonModal
          isOpen={isOpen}
          toggleOpenModal={toggleOpenModal}
          children={
            <AddAgenciesForm
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              getNewAgency={getNewAgency}
              toggleOpenModal={toggleOpenModal}
            />
          }
        />
      )}
      <Grid item xs={11}>
        <div className={classes.buttonContainer}>
          <Button handleClick={toggleOpenModal} text="Add Agencies" />
        </div>
        <Paper className={classes.root}>
          <SearchComponent flexDirection="row" handleSearch={handleSearch} />
          {errorMessage ? (
            <div style={setModalStyle()}>
              <Typography style={{ color: 'black' }}>{errorMessage}</Typography>
            </div>
          ) : (
            <TableComponent
              tableHeaders={agencyHeaders}
              tableData={orderBy(getSearchedAgency())}
              handleRowClick={handleRowClick}
              showDeleteButton={false}
            />
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

AgenciesView.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(withStyles(agenciesTableStyles)(AgenciesView));
