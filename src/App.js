import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import { Route, Switch } from "react-router-dom";
import routes from "./routes/routes";
import Home from "./components/Home";
import { useState } from "react";
import protectedRoute from "./routes/protectedRoute";
import NotFound from "./components/NotFound";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <BrowserRouter>
      <Layout />

      <Switch>
        <Route path="/" component={Home} exact />
        {isLogin
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
    </BrowserRouter>
  );
}

export default App;
