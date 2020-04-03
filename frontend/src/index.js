import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Dashboard from './views/Dashboard';
import Test from './views/Test';
import Recipe from './views/Recipe';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={props => <Dashboard {...props} />} />
        <Route path="/recipe" exact render={props => <Recipe {...props} />} />
        <Route path="/test" exact render={props => <Test {...props} />} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
