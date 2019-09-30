import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import TableComponent from '../../Components/Tables/index';
import { agencyHeaders } from './Utils/index';
import { setModalStyle } from '../../Components/GlobalStyles/index';

const agenciesTableStyles = theme => ({
  root: {
    width: '100%',
    height: '100%',
    marginTop: theme.spacing(3)
  }
});

const AgenciesView = ({ classes, history }) => {
  const [agenciesArray, setAgenciesArray] = useState(null);

  const fetchAgencies = async () => {
    try {
      const agencyData = axios.get('agencies.json');
      const response = await agencyData;
      const agenciesArray = response.data;
      return setAgenciesArray(agenciesArray);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchAgencies();
  }, []);

  const handleRowClick = (event, data) => {
    event.preventDefault();
    history.push(`/agencies/agency/:${data.agencyId}/agents`, data.agents);
  };

  if (!agenciesArray) {
    return (
      <div style={setModalStyle()}>
        <CircularProgress color="primary" />
      </div>
    );
  }
  return (
    <Grid container spacing={3} justify="center" alignItems="center">
      <Grid item xs={11}>
        <Paper className={classes.root}>
          <TableComponent
            tableHeaders={agencyHeaders}
            tableData={agenciesArray}
            handleRowClick={handleRowClick}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default withRouter(withStyles(agenciesTableStyles)(AgenciesView));
