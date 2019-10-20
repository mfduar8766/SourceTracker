import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import clsx from 'clsx';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import SearchComponent from '../../Search/index';
import SearchSelection from './SearchSelection';
import { GET_DROPDOWN_VALUES } from '../../../Utils/index';
import { handleGlobalSearch } from '../Utils/index';
import { StateContext } from '../../../Store/index';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faBell } from '@fortawesome/free-solid-svg-icons';

const AppBarComponent = ({
  classes,
  isSideDrawerOpen,
  history,
  toggleDrawer,
  openSettings
}) => {
  const { store, dispatch } = useContext(StateContext);
  const [selectedValue, setSelectedValues] = useState('');
  const [globalSearchResults, setGlobalSearchResults] = useState(null);
  const [showResultsList, setShowResultsList] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [dropDownValues, setDropDownValues] = useState(null);
  const agenciesArray = store.agenciesArray;

  const getGlobalDropDownValues = async () => {
    try {
      const dropdownValues = axios.get(GET_DROPDOWN_VALUES);
      const response = await dropdownValues;
      const dropDownObject = response.data;
      const { globalSearchOptions } = dropDownObject;
      return setDropDownValues(globalSearchOptions);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getGlobalDropDownValues();
  }, []);

  const getSearchValue = event => {
    if (event.target.value === '') {
      setShowResultsList(false);
      return setGlobalSearchResults(null);
    }
    setErrorMessage(null);
    setShowResultsList(true);
    const searchResults = handleGlobalSearch(
      selectedValue,
      agenciesArray,
      event.target.value
    );
    if (searchResults === null || undefined) {
      return setErrorMessage('No records found.');
    }
    return setGlobalSearchResults(searchResults);
  };

  const navigateToSelectedResult = (event, result) => {
    event.preventDefault();
    if (result.agencyId) {
      history.push(`/search-results/${result.agencyName}/${result.agencyId}`, {
        key: 'Agency',
        data: [result]
      });
      setShowResultsList(false);
    } else if (result.agentId) {
      history.push(
        `/search-results/${result.firstName}-${result.lastName}/${result.agentId}`,
        { key: 'Agent', data: [result] }
      );
      setShowResultsList(false);
    } else if (result.id) {
      history.push(
        `/search-results/${result.firstName}-${result.lastName}/${result.id}`,
        { key: 'Member', data: [result] }
      );
      setShowResultsList(false);
    }
  };

  const handleChange = event => setSelectedValues(event.target.value);

  const openNotifications = event => {};

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: isSideDrawerOpen
      })}
    >
      <Toolbar className={classes.toolBar}>
        <IconButton
          onClick={toggleDrawer}
          color="inherit"
          aria-label="open drawer"
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: isSideDrawerOpen
          })}
        >
          <MenuIcon />
        </IconButton>
        <div className={classes.titleWidth}>
          <Typography
            className={classes.title}
            onClick={() => history.push('/')}
            variant="h6"
            noWrap
          >
            Source Tracker
          </Typography>
        </div>
        <SearchSelection
          dropDownValues={dropDownValues || []}
          selectedValue={selectedValue}
          handleChange={handleChange}
        />
        <SearchComponent
          isDisabled={selectedValue === '' ? true : false}
          borderBottom="none"
          maxHeight="50%"
          width="20%"
          backgroundColor="#4C4C4C"
          handleSearch={getSearchValue}
          listValues={globalSearchResults}
          showResultsList={showResultsList}
          navigateToSelectedResult={navigateToSelectedResult}
          errorMessage={errorMessage}
        />
        <div style={{ flex: 1 }} />
        <div className={classes.settings}>
          <FontAwesomeIcon
            className={classes.settingsNotifications}
            onClick={event => openNotifications(event)}
            icon={faBell}
            size="2x"
          />
          <FontAwesomeIcon
            className={classes.settingsNotifications}
            onClick={event => openSettings(event)}
            icon={faCog}
            size="2x"
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

AppBarComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  isSideDrawerOpen: PropTypes.bool,
  history: PropTypes.object.isRequired,
  toggleDrawer: PropTypes.func
};

export default withRouter(AppBarComponent);
