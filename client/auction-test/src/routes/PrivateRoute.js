import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const user = {
        username: localStorage.getItem('username'),
        role: localStorage.getItem('role')
      }
      setCurrentUser(user);
      setLoadingUser(false);
    }
  }, []);
  if (loadingUser) {
    return null
  }
  return (
    <Route
      {...rest}
      render={
        routeProps =>
          !!currentUser
            ? (<RouteComponent {...routeProps} />)
            : (<Redirect to={"/"} />)
      }
    />
  );
};

export default PrivateRoute;
