import React from "react";
import routes from "../routes/routes";
import { Route, Routes } from "react-router-dom";

const Content = () => {

  return (
    <div>
      {routes && routes.length > 0 ? (
        <Routes>
          {routes.map((route) => {
            if(route.path !== '/' || route.path !== '/register'){
              return (
                <Route
                  path={route.path}
                  key={route.path + route.name}
                  element={route.component}
                ></Route>
              );
            }
            return (
              <Route
                  path={'*'}
                  key={'* 404'}
                  element={
                  <div className="d-flex justify-content-center align-items-center" style={{height: '100vh',overflowY:'hidden'}}>
                    <h1 style={{display: 'block'}}>404</h1>
                  </div>
                }
                ></Route>
            )
          })}
        </Routes>
      ) : (
        <h1>NO</h1>
      )}
    </div>
  );
};

export default Content;