import React from 'react';
import {Route, Routes} from "react-router";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/about' element={<About/>}>
      </Route>
      <Route path='/posts' element={<Posts/>}>
      </Route>
      <Route path='*'
             element={<Error/>}
      />
    </Routes>
  );
};

export default AppRouter;