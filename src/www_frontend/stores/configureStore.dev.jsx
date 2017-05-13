import {createStore, applyMiddleware, compose} from 'redux'
import createLogger from 'redux-logger'
import DevTools from 'shared/DevTools'
import createSagaMiddleware, { END } from 'redux-saga'

export default function configureStore(rootReducer, preloadedState) {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        preloadedState,
        compose(
            applyMiddleware(
                createLogger(), sagaMiddleware,
            ),
            DevTools.instrument(),
        )
    );

    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);
    
    return store;
}
