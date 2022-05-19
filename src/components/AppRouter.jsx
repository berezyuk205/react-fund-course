import React from 'react';
import {Route, Routes} from "react-router";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import PostIdPage from "../pages/PostIdPage";
import {privateRoutes, publicRoutes} from "../router";
import Login from "../pages/Login";

const AppRouter = () => {
  const isAuth = false;
  return (
    isAuth
      ?
        <Routes>
          {privateRoutes.map(route =>
            <Route
              path={route.path}
              element={<route.element/>}
            />
          )}
          <Route path='*'
                 element={<Posts/>}
          />
        </Routes>
      :
        <Routes>
          {publicRoutes.map(route =>
            <Route
              path={route.path}
              element={<route.element/>}
            />
          )}
          <Route path='*'
                 element={<Login/>}
          />
        </Routes>
  );
};

export default AppRouter;