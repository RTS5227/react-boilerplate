import {createStore, applyMiddleware} from 'redux'
import rootReducer from '../reducer'
import {browserHistory, hashHistory} from 'react-router'
import {routerMiddleware} from 'react-router-redux'
import {loadingBarMiddleware} from 'react-redux-loading-bar'
import createSagaMiddleware, { END } from 'redux-saga'

export default function (preloadedState) {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(
            sagaMiddleware,
            routerMiddleware(hashHistory),
            loadingBarMiddleware({promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE']})
        )
    );
    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);
    return store;
}
