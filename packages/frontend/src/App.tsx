import axios from 'axios';
import Cookies from 'js-cookie';
import React from 'react';
import {
    BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import { routes } from './constants/routes';
import './App.css';
import * as CookieNames from './constants/cookie';

axios.interceptors.request.use((config) => {
    const token = Cookies.get(CookieNames.Token);
    if (token) {
        return {
            ...config,
            headers: { ...config.headers, token },
        };
    }

    return config;
});

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
