import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";

import Dashboard from './views/Dashboard';
import Login from './views/Login';
import Register from './views/Register';
import Liked from './views/Liked';
import Profile from './views/Profile';
import Recipe from './views/Recipe';
import MyRecipes from './views/MyRecipes';
import CreateRecipe from './views/CreateRecipe';
import EditRecipe from './views/EditRecipe';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={props => <Dashboard {...props} />} />
      <Route path="/login" exact render={props => <Login {...props} />} />
      <Route path="/register" exact render={props => <Register {...props} />} />
      <Route path="/liked" exact render={props => <Liked {...props} />} />
      <Route path="/profile" exact render={props => <Profile {...props} />} />
      <Route path="/my-recipes" exact render={props => <MyRecipes {...props} />} />
      <Route path="/recipe" exact render={props => <Recipe {...props} />} />
      <Route path="/create-recipe" exact render={props => <CreateRecipe {...props} />} />
      <Route path="/edit-recipe" exact render={props => <EditRecipe {...props} />} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
