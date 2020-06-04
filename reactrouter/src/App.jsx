import './App.css';
import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import routes from './routes/routes';


class App extends Component {
  // eslint-disable-next-line react/sort-comp
  render() {
    return (
      <Router>
        <div>
          <Menu />

          <div className="container">
            <div className="row">

              {this.showContentMenu(routes)}
            </div>

          </div>
        </div>
      </Router>
    );
  }

  showContentMenu = (params) => {
    let result = null;
    if (params.length > 0) {
      result = params.map((route, index) => (
        <Route
            // eslint-disable-next-line react/no-array-index-key
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.main}
        />
      ));
    }
    return <Switch>{result}</Switch>;
  }
}

export default App;
