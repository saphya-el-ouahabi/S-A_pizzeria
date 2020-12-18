import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({ component: Component, ...rest }) {
  const userConnexion = useSelector((state) => state.userConnexion);
  const { userInfo } = userConnexion;
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/connexion" />
        )
      }
    ></Route>
  );
}