import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import AppBarComponent from './Components/AppBar';
import LeftDrawer from './Components/LeftDrawer';
import { drawerStyles } from './Utils/Styles';

const MainComponent = ({ history }) => {
  const classes = drawerStyles();
  const theme = useTheme();
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

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
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
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
