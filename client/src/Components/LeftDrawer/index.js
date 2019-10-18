import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faHome,
  faUsers,
  faChartBar,
  faCog,
  faBell
} from '@fortawesome/free-solid-svg-icons';

import SearchComponent from '../Search/index';
import { drawerStyles } from './Utils/Styles';
import { handleGlobalSearch } from './Utils/index';
import SearchSelection from './SearchSelection';
import { GlobalStateContext } from '../GlobalStateContext/index';
import { GET_DROPDOWN_VALUES } from '../../Utils/index';

const LeftDrawer = ({ history }) => {
  const { agenciesArray } = useContext(GlobalStateContext);
  const classes = drawerStyles();
  const theme = useTheme();
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const [selectedValue, setSelectedValues] = useState('');
  const [globalSearchResults, setGlobalSearchResults] = useState(null);
  const [showResultsList, setShowResultsList] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [dropDownValues, setDropDownValues] = useState(null);
  const sideDrawerIcons = [
    {
      id: 0,
      name: 'Home',
      icon: (
        <FontAwesomeIcon
          size="2x"
          className={classes.iconColor}
          icon={faHome}
        />
      ),
      link: '/'
    },
    {
      id: 1,
      name: 'Agencies',
      icon: (
        <FontAwesomeIcon
          size="2x"
          className={classes.iconColor}
          icon={faUsers}
        />
      ),
      link: '/agencies'
    },
    {
      id: 2,
      name: 'Agents',
      icon: (
        <FontAwesomeIcon
          size="2x"
          className={classes.iconColor}
          icon={faUserCircle}
        />
      ),
      link: '/agents'
    },
    {
      id: 3,
      name: 'Reports',
      icon: (
        <FontAwesomeIcon
          size="2x"
          className={classes.iconColor}
          icon={faChartBar}
        />
      ),
      link: '/reports'
    },
    {
      id: 4,
      name: 'Settings',
      icon: (
        <FontAwesomeIcon
          className={classes.iconColor}
          onClick={event => openSettings(event)}
          icon={faCog}
          size="2x"
        />
      )
    }
  ];

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

  const toggleDrawer = () => {
    setIsSideDrawerOpen(isSideDrawerOpen => !isSideDrawerOpen);
  };

  const navigateToPage = (event, link) => {
    event.preventDefault();
    history.push(link);
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

  const openSettings = event => {
    event.preventDefault();
  };

  const handleChange = event => setSelectedValues(event.target.value);

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

  const openNotifications = event => {
    event.preventDefault();
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
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
              className={classes.iconColor}
              onClick={event => openNotifications(event)}
              icon={faBell}
              size="2x"
            />
            <FontAwesomeIcon
              className={classes.iconColor}
              onClick={event => openSettings(event)}
              icon={faCog}
              size="2x"
            />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: isSideDrawerOpen,
          [classes.drawerClose]: !isSideDrawerOpen
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: isSideDrawerOpen,
            [classes.drawerClose]: !isSideDrawerOpen
          })
        }}
        open={isSideDrawerOpen}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={() => setIsSideDrawerOpen(false)}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon className={classes.chevronLeft} />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {sideDrawerIcons.map(icon => (
            <ListItem
              onClick={event => navigateToPage(event, icon.link)}
              className={classes.listItem}
              button
              key={icon.id}
            >
              <ListItemIcon>{icon.icon}</ListItemIcon>
              <ListItemText>{icon.name}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default withRouter(LeftDrawer);
