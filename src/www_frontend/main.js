import React from 'react';
import ReactDOM from 'react-dom';
import Perf from 'react-addons-perf'
import { Provider } from 'react-redux'
import Root from './components/Root'
import reducer from './reducer'
import rootSagas from './saga'
import Router from 'universal-router';
import Api from 'helpers/api';
import history from 'helpers/history';
import configureStore from './stores/configureStore'

const store = configureStore(reducer);
store.runSaga(rootSagas);

window.Perf = Perf;

const router = new Router(Root);
const context = {
  api: Api.create({ baseUrl: '' }),
};

function render(location) {
  router.resolve({ path: location.pathname, ...context }).then((result) => {
  	const resultComponent = (
  		<Provider store={store}>
		    {result.component}
		  </Provider>
  	);
    ReactDOM.render(result.component, document.getElementById('root'), () => {
      document.title = result.title;
    });
  });
}

history.listen(render);
render(history.location);