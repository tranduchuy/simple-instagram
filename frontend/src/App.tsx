import React from 'react';
import {
    BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import { routes } from './constants/routes';
import './App.css';

const App = (): JSX.Element => (
    <>
        <Router>
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
        </Router>
    </>
);

export default App;
