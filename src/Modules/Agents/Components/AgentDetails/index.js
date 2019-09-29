import React, { useState, useEffect } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ToolBar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';

import { agentDetails } from './Utils/Styles';
import BarGraphs from '../../../../Components/Graphs/BarGraphs';

const createCardHeader = ({ classes, agent, dataType }) => (
  <AppBar position="static">
    {dataType === 'user' ? (
      <ToolBar className={classes.toolBar}>
        <img className={classes.image} src={agent.photo} alt="agent" />
        <div className={classes.userName}>
          <Typography>{agent.firstName}</Typography>
          <Typography className={classes.lastName}>{agent.lastName}</Typography>
        </div>
      </ToolBar>
    ) : (
      <ToolBar className={classes.memberInformation}>
        <Typography>Member Information</Typography>
      </ToolBar>
    )}
  </AppBar>
);

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

const AgentDetails = ({ location, classes }) => {
  const [agent, setAgent] = useState(null);
  const dataType = 'user';

  useEffect(() => {
    setAgent(location.state);
  }, []);

  if (!agent) {
    return (
      <div className={classes.loadingIcon}>
        <CircularProgress color="primary" />
      </div>
    );
  }
  return (
    <Grid container spacing={1} justify="center" alignItems="center">
      <Grid item xs={6}>
        <Card className={classes.card}>
          {createCardHeader({ classes, agent, dataType })}
          <CardContent>
            <BarGraphs data={agent.membersList} barProps={barProps} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default withStyles(agentDetails)(AgentDetails);
