import React from 'react';
import openOffice from './assets/openOffice.jpg';
import { withStyles } from '@material-ui/core/styles';
import { mergeClasses } from '@material-ui/styles';

const appStyles = () => ({
  app: {
    height: '100%',
    width: '100%',
    zIndex: -1
  },
  imageContainer: {
    height: '100%',
    width: '100%',
    zIndex: -1
  }
});

const App = ({ classes }) => (
  <div className={mergeClasses.app}>
    <div className={classes.imageContainer}>
      <img src={openOffice} style={{ width: '100%' }} />
    </div>
  </div>
);

export default withStyles(appStyles)(App);
