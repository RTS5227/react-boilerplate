import React from 'react';
import {render} from 'react-dom';
import Perf from 'react-addons-perf'
import { Provider } from 'react-redux'
import App from './app'
import reducer from './reducer'
import rootSagas from './saga'
import configureStore from './stores/configureStore'

const store = configureStore(reducer);
store.runSaga(rootSagas);

window.Perf = Perf;

let a = App;
//RelayModernGraphQLTag
console.log(a().props.query.modern());

render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'))