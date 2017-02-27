import {createStore, applyMiddleware, compose} from 'redux'
import createLogger from 'redux-logger'
import rootReducer from '../reducer'
import {browserHistory, hashHistory} from 'react-router'
import {routerMiddleware} from 'react-router-redux'
import {loadingBarMiddleware} from 'react-redux-loading-bar'
import DevTools from 'cores/DevTools/index'
import createSagaMiddleware, { END } from 'redux-saga'

export default function configureStore(preloadedState) {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        preloadedState,
        compose(
            applyMiddleware(
                createLogger(), sagaMiddleware,
                routerMiddleware(hashHistory),
                loadingBarMiddleware({promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE']}),
            ),
            DevTools.instrument(),
        )
    );

    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducer', () => {
            const nextRootReducer = require('../reducer').default;
            store.replaceReducer(nextRootReducer)
        })
    }

    return store;
}
