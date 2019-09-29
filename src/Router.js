import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import AgentsTable from './Modules/Agents/index';
import AgentDetails from './Modules/Agents/Components/AgentDetails/index';
import LeftDrawer from './Components/LeftDrawer/index';
import PageNotFound from './Components/PageNotFound';
import AgenciesView from './Modules/Agencies/index';

const AppRouter = () => (
  <Router>
    <LeftDrawer />
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/agencies" component={AgenciesView} />
      <Route exact path="/agents" component={AgentsTable} />
      <Route exact path="/agent/:id" component={AgentDetails} />
      <Route exact path="*" component={PageNotFound} />
    </Switch>
  </Router>
);

export default AppRouter;
