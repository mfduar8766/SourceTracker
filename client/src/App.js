import React from 'react';
import PropTypes from 'prop-types';
import openOffice from './assets/openOffice.jpg';
import { withStyles } from '@material-ui/core/styles';

const appStyles = () => ({
  mainTag: {
    position: 'fixed',
    height: '100%',
    width: '100%',
    padding: 0,
    margin: 0
  },
  image: {
    width: '100%',
    height: '100%'
  }
});

const App = ({ classes }) => (
  <main className={classes.mainTag}>
    <img className={classes.image} src={openOffice} alt="homepage" />
  </main>
);

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(appStyles)(App);
