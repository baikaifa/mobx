import React, { Component } from "react";
import { Switch, Route, HashRouter as Router } from "react-router-dom";
import { Provider } from "mobx-react";
import { LocaleProvider } from "antd";
import zhCN from 'antd/es/locale/zh_CN';
import { getLayoutData } from "./router/router";
import stores from "./stores/store";

class App extends Component {
  render() {
    const routers = getLayoutData();
    return (
      <Provider {...stores}>
        <Router>
          <LocaleProvider locale={zhCN}>
            <Switch>
              {routers.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.render}
                />
              ))}
            </Switch>
          </LocaleProvider>
        </Router>
      </Provider>
    );
  }

}

export default App;
