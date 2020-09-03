import React from 'react';
import {
    BrowserRouter as Router, Switch, Link, Route,
} from 'react-router-dom';
import { routes } from './constants/routes';
import './App.css';

const App = (): JSX.Element => (
    <div className="App">
        <Router>
            <div>
                <ul style={{ position: 'fixed', bottom: 0, left: 0 }}>
                    {
                        routes.map((r) => (
                            <li
                                key={r.path}
                                style={{ display: 'inline-block', margin: '0 10px' }}
                            >
                                <Link to={r.path}>{r.name}</Link>
                            </li>
                        ))
                    }
                </ul>

                <Switch>
                    {
                        routes.map((r) => (
                            <Route
                                path={r.path}
                                exact={r.path === '/'}
                                component={r.component}
                                key={r.path}
                            />
                        ))
                    }
                </Switch>
            </div>
        </Router>
    </div>
);

export default App;
