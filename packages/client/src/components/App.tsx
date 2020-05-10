import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { CssBaseline } from '@material-ui/core';
import { Add } from './podcast';
import { Home } from './Home';

export function App() {
  const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
  });

  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/podcast/add" exact>
            <Add key="add-page" />
          </Route>
          <Route path="/" exact>
            <Home key="home-page" />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}
