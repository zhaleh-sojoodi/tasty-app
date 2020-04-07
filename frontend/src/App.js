import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import Register from './views/Register';
import Liked from './views/Liked';
import Profile from './views/Profile';
import EditProfile from './views/EditProfile';
import Recipe from './views/Recipe';
import MyRecipes from './views/MyRecipes';
import CreateRecipe from './views/CreateRecipe';
import EditRecipe from './views/EditRecipe';

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
      <Switch>
        <Route path="/" exact render={props => <Dashboard {...props} />} />
        <Route path="/login" exact render={props => <Login {...props} />} />
        <Route path="/register" exact render={props => <Register {...props} />} />
        <Route path="/recipe" exact render={props => <Recipe {...props} />} />
        <ProtectedRoute path="/profile" exact component={Profile} />
        <ProtectedRoute path="/profile/:id" exact component={Profile} />
        <ProtectedRoute path="/edit-profile" exact component={EditProfile} />
        <ProtectedRoute path="/liked" exact component={Liked} />} />
        <ProtectedRoute path="/my-recipes" exact component={MyRecipes} />} />
        <ProtectedRoute path="/create-recipe" exact component={CreateRecipe} />} />
        <ProtectedRoute path="/edit-recipe" exact component={EditRecipe} />} />
      </Switch>
    );
  }
}

export default App;
// import React, { Component, useEffect, useState } from "react";
// import { Switch, Route, Link, Redirect } from "react-router-dom";

// import Dashboard from './views/Dashboard';
// import Login from './views/Login';
// import Register from './views/Register';
// import Liked from './views/Liked';
// import Profile from './views/Profile';
// import Recipe from './views/Recipe';
// import MyRecipes from './views/MyRecipes';
// import CreateRecipe from './views/CreateRecipe';
// import EditRecipe from './views/EditRecipe';

// const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
//   return (
//     <Route
//       path={path}
//       {...rest}
//       render={(props) => {
//         console.log(props);
//         return loggedIn ? (
//           <Comp {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: "/login",
//               state: {
//                 prevLocation: path,
//                 error: "You need to login first!",
//               },
//             }}
//           />
//         );
//       }}
//     />
//   );
// };

// const AUTH_TOKEN = "auth_token";

// function App() {
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [location] = useState();

//   useEffect(() => {
//     if (sessionStorage.getItem(AUTH_TOKEN) !== null) {
//       setLoggedIn(true);
//     }
//   }, []);

//   function handleLogin() {

//   }

//   return (
//     <div>
//       <div className="links">
//         <Link to="/" className="link">
//           Home
//         </Link>
//         <Link to="/profile" className="link">
//           Profile
//         </Link>
//         {/* <button onClick={this.handleLogin}>Login</button> */}
//       </div>
//       <div className="tabs">
//         {/* {error && <div>ERROR: {error}</div>} */}
//         <Switch>
//           <Route path="/" exact component={Dashboard} />
//           <Route path="/login" exact render={props => <Login {...props} />} />
//           <Route path="/register" exact render={props => <Register {...props} />} />
//           <ProtectedRoute path="/liked" exact render={props => <Liked {...props} />} />
//           <ProtectedRoute path="/profile" exact render={props => <Profile {...props} />} />
//           <ProtectedRoute path="/my-recipes" exact render={props => <MyRecipes {...props} />} />
//           <ProtectedRoute path="/create-recipe" exact render={props => <CreateRecipe {...props} />} />
//           <ProtectedRoute path="/edit-recipe" exact render={props => <EditRecipe {...props} />} />
//         </Switch>
//       </div>
//     </div>
//   );
// }

// export default App;