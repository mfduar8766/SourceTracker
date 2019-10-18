import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginTop: '1rem'
  },
  paper: {
    padding: theme.spacing(1, 2)
  }
}));

const handleClick = event => {
  event.preventDefault();
  alert('You clicked a breadcrumb.');
};

const BreadCrumbComponent = ({ location }) => {
  const classes = useStyles();
  const [currentLocation, setCurrentLocation] = useState([]);
  // const removeForwardSlash = location.split('/').join('');

  useEffect(() => {
    setCurrentLocation([...currentLocation, location]);
  }, []);
  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.paper}>
        <Breadcrumbs separator={<NavigateNextIcon />} aria-label="breadcrumb">
          <Link color="inherit" href={location}>
            test
          </Link>
          <Link color="inherit" href={location}>
            test
          </Link>
        </Breadcrumbs>
      </Paper>
    </div>
  );
};

BreadCrumbComponent.propTypes = {
  location: PropTypes.object.isRequired
};

export default BreadCrumbComponent;
