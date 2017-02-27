import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router'
import {requireAuthentication} from './helpers/requireAuthentication'
import {requireRoot} from './helpers/requireRoot'
import requireZopim from './helpers/requireZopim'
import AccessDenied from './components/Pages/Error/AccessDenied'
import NotFound from './components/Pages/Error/NotFound'
import ServerError from './components/Pages/Error/ServerError'
import {layouts, customer, order, transactions} from './components'

const {
    MainLayout, LoginLayout, ErrorLayout,
    RegisterLayout, RootLayout
} = layouts;

export default (
    <Route component={requireRoot(requireZopim(RootLayout))}>
        <Route name="order_print" path="/order_print" component={requireAuthentication(order.components.PrintBarcode)}/>
        <Route path="/" component={requireAuthentication(MainLayout)}>
            <IndexRoute component={order.components.Management}/>
            <Route path="profile" component={customer.components.Detail}/>

            <Route path="orders">
                <IndexRoute component={order.components.Management}/>
                {/*<Route path="create" component={order.components.Form}/>*/}
                <Route path="create" component={order.components.OrderForm}/>
                <Route path=":orderId" component={order.components.Detail}/>
            </Route>

            <Route path="transactions">
                <IndexRoute component={transactions.components.Management}/>
            </Route>
        </Route>

        <Route path="/change_pass" component={requireAuthentication(customer.components.ChangePass, false)}/>

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
