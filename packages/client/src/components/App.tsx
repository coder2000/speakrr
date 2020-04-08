import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Layout } from 'antd';
import { Add, Home } from './podcast';

export function App() {
  const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
  });

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Router>
          <Switch>
            <Route path="/podcast/add" exact>
              <Add />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </Router>
      </Layout>
    </ApolloProvider>
  );
}
