import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import TableComponent from '../../Components/Tables/index';
import { agencyHeaders } from './Utils/index';
import LoadingIcon from '../../Components/LoadingIcon';
import Button from '../../Components/Buttons/index';

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

  const addAgency = () => {};

  const handleRowClick = (event, data) => {
    event.preventDefault();
    history.push(`/agencies/agency/:${data.agencyId}/agents`, data.agents);
  };

  if (!agenciesArray) {
    return <LoadingIcon color="primary" />;
  }
  return (
    <Grid container spacing={3} justify="center" alignItems="center">
      <Grid item xs={11}>
        <div className={classes.buttonContainer}>
          <Button handleClick={addAgency} text="Add Agencies" />
        </div>
        <Paper className={classes.root}>
          <TableComponent
            tableHeaders={agencyHeaders}
            tableData={agenciesArray}
            handleRowClick={handleRowClick}
            tableRowsPerPage={5}
            rowsPerPageOptions={[5, 10, 15]}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default withRouter(withStyles(agenciesTableStyles)(AgenciesView));
