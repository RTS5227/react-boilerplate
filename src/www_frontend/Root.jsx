/**
 * Created by Tester-Ali on 25-08-2016.
 */

import React from 'react'
import {Provider} from 'react-redux';
import {Router} from 'react-router'
import routes from './Routes'

export default ({store, history}) => {
    return (
        <Provider store={store}>
            <Router history={history}>{routes}</Router>
        </Provider>
    );
}
