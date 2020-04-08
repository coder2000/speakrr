import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { Add, Home } from './podcast';

export function App() {
  return (
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
  );
}
