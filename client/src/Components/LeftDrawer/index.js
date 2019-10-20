import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import AppBarComponent from './Components/AppBar';
import LeftDrawer from './Components/LeftDrawer';
import { drawerStyles } from './Utils/Styles';
import CommonModal from '../Modals/index';
import Settings from '../Settings/index';

const MainComponent = ({ history }) => {
  const classes = drawerStyles();
  const theme = useTheme();
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {}, []);

  const toggleDrawer = () => {
    setIsSideDrawerOpen(isSideDrawerOpen => !isSideDrawerOpen);
  };

  const navigateToPage = (event, link) => {
    event.preventDefault();
    history.push(link);
  };

  const openSettings = event => {
    event.preventDefault();
    setIsSettingsOpen(isSettingsOpen => !isSettingsOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      {isSettingsOpen && (
        <CommonModal
          backgroundColor="#4C4C4C"
          isOpen={isSettingsOpen}
          toggleOpenModal={openSettings}
          children={<Settings />}
        />
      )}
      <AppBarComponent
        classes={classes}
        isSideDrawerOpen={isSideDrawerOpen}
        toggleDrawer={toggleDrawer}
        openSettings={openSettings}
        setIsSideDrawerOpen={setIsSideDrawerOpen}
      />
      <LeftDrawer
        openSettings={openSettings}
        navigateToPage={navigateToPage}
        isSideDrawerOpen={isSideDrawerOpen}
        theme={theme}
        classes={classes}
      />
    </div>
  );
};

MainComponent.popTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(MainComponent);
