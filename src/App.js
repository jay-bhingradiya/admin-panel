import "./App.css";
import Layout from "./components/Layout/Layout";
import { Route, Switch } from "react-router-dom";
import routes from "./routes/routes";
import Home from "./components/Home";

import { Fragment, useContext } from "react";
import protectedRoute from "./routes/protectedRoute";
import NotFound from "./components/NotFound";
import AdminContext from "./store/admin-context";

function App() {
  const adminCtx = useContext(AdminContext);

  return (
    <Fragment>
      <Layout />

      <Switch>
        <Route path="/" component={Home} exact />

        {adminCtx.isLogin
          ? protectedRoute.map((route, key) => {
              return (
                <Route
                  path={route.path}
                  component={route.Component}
                  key={key}
                />
              );
            })
          : routes.map((route, key) => {
              return (
                <Route
                  path={route.path}
                  component={route.Component}
                  key={key}
                />
              );
            })}
        <Route path="*" component={NotFound} exact />
      </Switch>
    </Fragment>
  );
}

export default App;
