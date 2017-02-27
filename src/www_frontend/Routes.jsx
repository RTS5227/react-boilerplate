import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router'
import {requireAuthentication} from './helpers/requireAuthentication'
import AccessDenied from './components/Pages/Error/AccessDenied'
import NotFound from './components/Pages/Error/NotFound'
import ServerError from './components/Pages/Error/ServerError'
import {layouts, home} from './components'

const {
    MainLayout, LoginLayout, ErrorLayout,
    RegisterLayout, RootLayout
} = layouts;

export default (
    <Route component={RootLayout}>
        <Route path="/" component={requireAuthentication(MainLayout)}>
            <IndexRoute component={home.components.Management}/>
        </Route>
        <Route path="/login" component={LoginLayout}>
            <IndexRoute component={customer.components.Login}/>
        </Route>

        <Route path="/register" component={RegisterLayout}>
            <IndexRoute component={customer.components.Register}/>
        </Route>

        <Route path="/error" component={ErrorLayout}>
            <Route path="403" component={AccessDenied}/>
            <Route path="404" component={NotFound}/>
            <Route name="500" path="500" components={ServerError}/>
        </Route>

        <Route path="*" component={NotFound}/>
    </Route>
);
