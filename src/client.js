/* eslint-disable no-unused-vars */
import 'babel-polyfill';
import React from 'react';
import { render,  } from 'react-dom';
import { Provider } from 'react-redux';
import _ from 'lodash';
import Helmet from 'react-helmet';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import routes from './routes';
import helmetconfig from './appConfig';
import configureStore from './redux/store';
import './styles/style.css';

const element = document.getElementById('app-container');

const initState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const history = createHistory();
const store = configureStore(history, initState);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Helmet {...helmetconfig.header} />
        <Switch>{routes.map(route => <Route key={_.uniqueId()} exact={route.exact || false} path={route.path} render={props => (<route.component {...props} routes={route.routes || null} />)} />)}</Switch>
      </div>
    </ConnectedRouter>
  </Provider>,
  element,
);
