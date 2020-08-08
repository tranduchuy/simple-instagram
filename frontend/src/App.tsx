import React from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import { routes } from "./constants/routes";
import './App.css';

class App extends React.Component<any, any> {
  render(): React.ReactElement {
    return (
        <div className="App">
          <Router>
            <div>
              <ul style={{position: 'fixed', bottom: 0, left: 0}}>
                {
                  routes.map((r, index) => {
                    return <li key={index}
                               style={{display: 'inline-block', margin: '0 10px'}}>
                      <Link to={r.path}>{r.name}</Link>
                    </li>
                  })
                }
              </ul>

              <Switch>
                {
                  routes.map((r, index) => {
                    return <Route path={r.path}
                                  exact={r.path === '/'}
                                  component={r.component}
                                  key={index}/>
                  })
                }
              </Switch>
            </div>
          </Router>
        </div>
    );
  }
}

export default App;
