import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import Register from './views/Register';
import Liked from './views/Liked';
import MyProfile from './views/MyProfile';
import Profile from './views/Profile';
import EditProfile from './views/EditProfile';
import Recipe from './views/Recipe';
import MyRecipes from './views/MyRecipes';
import CreateRecipe from './views/CreateRecipe';
import EditRecipe from './views/EditRecipe';
import SearchResults from './views/SearchResults';
import AboutUs from './views/AboutUs';
import PageNotFound from './views/PageNotFound';

const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return sessionStorage.getItem("auth_token") !== null ? (
          <Comp {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  prevLocation: path,
                  error: "You need to login first!",
                },
              }}
            />
          );
      }}
    />
  );
};

class App extends Component {
  state = {
    loggedIn: false,
  };

  handleLogin = () => {
    const { state = {} } = this.props.location;
    const { prevLocation } = state;

    this.setState(
      {
        loggedIn: true,
      },
      () => {
        this.props.history.push(prevLocation);
      },
    );
  };

  render() {
    return (
      <>
      <Switch>
        <Route path="/" exact render={props => <Dashboard {...props} />} />
        <Route path="/login" exact render={props => <Login {...props} />} />
        <Route path="/register" exact render={props => <Register {...props} />} />
        <Route path="/recipe/:id" exact render={props => <Recipe {...props} />} />
        <Route path="/search" exact render={props => <SearchResults {...props} />} />
        <Route path="/about" exact render={props => <AboutUs {...props} />} />

        <ProtectedRoute path="/myprofile" exact component={MyProfile} />
        <ProtectedRoute path="/profile/:id" exact component={Profile} />
        <ProtectedRoute path="/edit-profile/" exact component={EditProfile} />
        <ProtectedRoute path="/liked" exact component={Liked} />} />
        <ProtectedRoute path="/my-recipes" exact component={MyRecipes} />} />
        <ProtectedRoute path="/create-recipe" exact component={CreateRecipe} />} />
        <ProtectedRoute path="/edit-recipe/:id" exact component={EditRecipe} />} />
        
        <Route component={PageNotFound} />
      </Switch>
      </>
    );
  }
}

export default App;