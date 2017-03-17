import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';

import reducer from './store/casaReducer';
import CasaApp from './CasaApp';
// import AppsContainer from './apps/AppsContainer';
import Login from './login/Login';
import LoginEmail from './login/LoginEmail';
import Signup from './login/signup/Signup';
import SignupEmail from './login/signup/SignupEmail';
import Welcome from './welcome/Welcome';
import Dashboard from './dashboard/Dashboard';
import Peers from './peers/PeersContainer';
import EditPeer from './peers/edit/EditPeerFormWrapper';
import Storefronts from './storefronts/StorefrontsContainer';
import EditStorefront from './storefronts/edit/EditStorefrontFormWrapper.js';
import LtiStorefront from './lti/LtiStorefrontContainer';
import createLogger from 'redux-logger';


const finalCreateStore = compose(
    applyMiddleware(thunk, createLogger(), routerMiddleware(browserHistory)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);
const store = finalCreateStore(combineReducers({
  ...reducer,
  routing: routerReducer
}));

const history = syncHistoryWithStore(browserHistory, store);

const Routes = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={CasaApp}>
        <IndexRoute component={Welcome}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/repos" >
          <IndexRoute component={Peers} />
          <Route path="edit/:peer" component={EditPeer}/>
          <Route path="new" component={EditPeer}/>
        </Route>
        <Route path="/storefronts" >
          <IndexRoute component={Storefronts} />
          <Route path="edit/:storefront" component={EditStorefront}/>
          <Route path="new" component={EditStorefront}/>
        </Route>
        <Route path="/stores" component={() => <span />} />
        <Route path="/login">
          <IndexRoute component={Login} />
          <Route path="email" component={LoginEmail}/>
        </Route>
        <Route path="/signup">
          <IndexRoute component={Signup} />
          <Route path="email" component={SignupEmail}/>
        </Route>
        <Route path="/store" component={LtiStorefront} />
      </Route>
    </Router>
  </Provider>
);
export default Routes;
