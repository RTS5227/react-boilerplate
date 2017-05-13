import React from 'react';
import ReactDOM from 'react-dom';
import Perf from 'react-addons-perf'
import { Provider } from 'react-redux'
import router from './components'
import reducer from './reducer'
import rootSagas from './saga'
import history from 'libs/history';
import configureStore from './stores/configureStore'
import { AppContainer } from 'react-hot-loader';
import Root from './Root';

const store = configureStore(reducer);
store.runSaga(rootSagas);
window.Perf = Perf;

const render = (Component, router) => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} router={router} />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(Root, router);

if (module.hot) {
  module.hot.accept('./Root', () => {
    render(Root, router);
  });
  module.hot.accept('./components', () => {
    render(Root, router);
  });
  module.hot.accept("./reducer", () => {
    store.replaceReducer(reducer);
  });
  module.hot.accept("./saga", () => {
    store.runSaga(rootSagas);
  });
}