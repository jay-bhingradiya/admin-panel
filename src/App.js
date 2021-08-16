import "./App.css";
import { Fragment, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import routes from "./routes/routes";
import Home from "./components/Home";
import protectedRoute from "./routes/protectedRoute";
import NotFound from "./components/NotFound";
import AdminContext from "./store/admin-context";

function App() {
  const adminCtx = useContext(AdminContext);
  console.log(adminCtx.isLogin);

  return (
    <Fragment>
      <Layout />

      <Switch>
        <Route path="/" component={Home} exact />
        {/* <Route path="/education" component={EducationDetails} exact /> */}

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
