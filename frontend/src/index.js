import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Dashboard from './views/Dashboard';
import Liked from './views/Liked';
import Profile from './views/Profile';
import Recipe from './views/Recipe';
import MyRecipes from './views/MyRecipes';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={props => <Dashboard {...props} />} />
      <Route path="/liked" exact render={props => <Liked {...props} />} />
      <Route path="/profile" exact render={props => <Profile {...props} />} />
      <Route path="/my-recipes" exact render={props => <MyRecipes {...props} />} />
      <Route path="/recipe" exact render={props => <Recipe {...props} />} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
