import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import LoadingIcon from '../LoadingIcon/index';
import { setModalStyle } from '../GlobalStyles/index';
import { displaySearchResultsStyles } from './Styles';
import RenderSearchResults from './RenderSearchResults';

const barProps = [
  {
    id: 0,
    dataKey: 'Ancillary',
    fill: '#E3FF'
  },
  {
    id: 1,
    dataKey: 'Group',
    fill: '#E33'
  },
  {
    id: 2,
    dataKey: 'Over65',
    fill: '#CC3F'
  },
  {
    id: 3,
    dataKey: 'Under65',
    fill: '#82ca9d'
  }
];

const checkSearchResults = (searchResult, classes, headers) => {
  switch (searchResult.key) {
    case 'Agent':
      return (
        <RenderSearchResults
          resultsArray={searchResult}
          classes={classes}
          headers={headers}
          barProps={barProps}
        />
      );
    case 'Agency':
      return (
        <RenderSearchResults
          resultsArray={searchResult}
          classes={classes}
          headers={headers}
          barProps={barProps}
        />
      );
    case 'Member':
      return (
        <RenderSearchResults
          resultsArray={searchResult}
          classes={classes}
          headers={headers}
          barProps={barProps}
        />
      );
    default:
      return null;
  }
};

const DisplaySearchResults = ({ classes, location }) => {
  const [searchResultsHeaders, setSearchResultsHeaders] = useState(null);
  const searchResults = location.state;
  const errorMessage = 'No records found.';
  const getHeaders = async () => {
    try {
      const dropdownValues = axios.get('/dropDownValues.json');
      const response = await dropdownValues;
      const dropDownObject = response.data;
      const { repHeaders, agentHeaders, agencyHeaders } = dropDownObject;
      const result = {
        repHeader: repHeaders,
        agentHeader: agentHeaders,
        agencyHeader: agencyHeaders
      };
      return setSearchResultsHeaders(result);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getHeaders();
  }, []);

  if (!searchResultsHeaders) {
    return (
      <div style={setModalStyle()}>
        <LoadingIcon color="primary" />
      </div>
    );
  }

  const displaySearchResults = checkSearchResults(
    searchResults,
    classes,
    searchResultsHeaders
  );

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={11}>
        <Paper className={classes.root}>
          {!displaySearchResults ? errorMessage : displaySearchResults}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default withStyles(displaySearchResultsStyles)(DisplaySearchResults);
