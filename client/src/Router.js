import React, { useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import App from './App';
import AgentsTable from './Modules/Agencies/Agents/index';
import PageNotFound from './Components/PageNotFound';
import AgenciesView from './Modules/Agencies/index';
import { GlobalStateContext } from './Components/GlobalStateContext/index';
import DisplaySearchResults from './Components/DisplaySearchResults/index';
import { GET_AGENCIES } from './Utils/index';
import MainComponent from './Components/LeftDrawer/index';

const AppRouter = () => {
  const [agenciesArray, setAgenciesArray] = useState(null);

  const fetchAgencies = async () => {
    try {
      const agencyData = axios.get(GET_AGENCIES);
      const response = await agencyData;
      const agenciesArray = response.data.data;
      return setAgenciesArray(agenciesArray);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchAgencies();
  }, []);

  return (
    <GlobalStateContext.Provider value={{ agenciesArray }}>
      <Router>
        <MainComponent />
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/agencies" component={AgenciesView} />
          <Route
            exact
            path="/agencies/:agencyName/:agencyId/agents"
            component={AgentsTable}
          />
          <Route
            exact
            path="/search-results/:searchedParam/:id"
            component={DisplaySearchResults}
          />
          <Route
            exact
            path="/agent-details/agent/:agentId"
            component={DisplaySearchResults}
          />
          <Route exact path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </GlobalStateContext.Provider>
  );
};

export default AppRouter;
