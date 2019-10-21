import React, { useEffect, useReducer } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import App from './App';
import AgentsTable from './Modules/Agencies/Agents/index';
import PageNotFound from './Components/PageNotFound';
import AgenciesView from './Modules/Agencies/index';
import DisplaySearchResults from './Components/DisplaySearchResults/index';
import MainComponent from './Components/LeftDrawer/index';
import { initialState, StateContext, reducer } from './Store/index';
import { addUser, getAgencies } from './Store/actions';
import { GET_AGENCIES } from './Utils/index';

const AppRouter = () => {
  const [store, dispatch] = useReducer(reducer, initialState);
  const fetchAgencies = async () => {
    try {
      const agencyData = axios.get(GET_AGENCIES);
      const response = await agencyData;
      const agenciesArray = response.data.data;
      dispatch(getAgencies({ agenciesArray }));
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchAgencies();
    const newUser = 'agencyOwner';
    dispatch(addUser({ newUser }));
  }, []);

  return (
    <StateContext.Provider value={{ store, dispatch }}>
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
    </StateContext.Provider>
  );
};

export default AppRouter;
