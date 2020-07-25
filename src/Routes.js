import LandingPage from './views/LandingPage/LandingPage';
import {AUTH_TOKEN} from './common/constant';
import {Redirect, Route, Switch} from 'react-router-dom';
import React from 'react';
import HomePage from './views/HomePage/HomePage';

const Routes = () =>{
  return (<Switch>
    <Route exact path={'/'} >
      <LandingPage />
    </Route>
    <Route
      exact
      path="/secured/home-page"
      render={(routeProps) => {
        const token = JSON.parse(localStorage.getItem(AUTH_TOKEN));
        if (!token) {
          alert('You unauthorize to access this URL');
          return <Redirect to={'/'} />;
        }
        // TODO: if token if not empty, call a new service authToken to check if token still valid
        console.log("home");
        return <HomePage {...routeProps} />;
      }}
    />

  </Switch>)
}


export default Routes;
