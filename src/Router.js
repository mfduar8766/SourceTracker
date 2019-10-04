import React, { useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import App from './App';
import AgentsTable from './Modules/Agents/index';
import AgentDetails from './Modules/Agents/Components/AgentDetails/index';
import LeftDrawer from './Components/LeftDrawer/index';
import PageNotFound from './Components/PageNotFound';
import AgenciesView from './Modules/Agencies/index';
import { GlobalStateContext } from './Components/GlobalStateContext/index';

const AppRouter = () => {
  const [agenciesArray, setAgenciesArray] = useState(null);

  const fetchData = async () => {
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
    fetchData();
  }, []);

  return (
    <GlobalStateContext.Provider value={{ agenciesArray }} >
      <Router>
        <LeftDrawer />
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/agencies" component={AgenciesView} />
          <Route
            exact
            path="/agencies/agency/:id/agents"
            component={PageNotFound}
          />
          <Route exact path="/agents" component={AgentsTable} />
          <Route exact path="/agent/:id" component={AgentDetails} />
          <Route exact path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </GlobalStateContext.Provider>
  );
};

export default AppRouter;
