import React from 'react';
import {Router, Route, Redirect, applyRouterMiddleware} from 'react-router'
import {requireAuthentication} from './helpers/requireAuthentication'
import AccessDenied from './components/Pages/Error/AccessDenied'
import NotFound from './components/Pages/Error/NotFound'
import ServerError from './components/Pages/Error/ServerError'
import {layouts, home} from './components'
import Relay from 'react-relay'
import useRelay from 'react-router-relay'

const {
    MainLayout, LoginLayout, ErrorLayout,
    RegisterLayout, RootLayout
} = layouts;

const ViewerQueries = {
  viewer: () => Relay.QL`query { viewer }`
};

export default (
    <Route component={RootLayout} queries={ViewerQueries}>
        <Route path="/" component={home.Home} />
        <Route path="/login" component={LoginLayout} />

        <Route path="/register" component={RegisterLayout} />

        <Route path="/e" component={ErrorLayout}>
            <Route path="403" component={AccessDenied}/>
            <Route path="404" component={NotFound}/>
            <Route name="500" path="500" components={ServerError}/>
        </Route>
        
        <Route path="*" component={NotFound}/>
    </Route>
);
