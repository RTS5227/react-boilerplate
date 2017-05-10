// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import Perf from 'react-addons-perf'
import { Provider } from 'react-redux'
import components from './components'
import reducer from './reducer'
import rootSagas from './saga'
import Router from 'universal-router';
import Api from 'helpers/api';
import history from 'helpers/history';
import PropTypes from 'prop-types';
import configureStore from './stores/configureStore'

const store = configureStore(reducer);
store.runSaga(rootSagas);

window.Perf = Perf;

const router = new Router(components);
const context = {
  api: Api.create({ baseUrl: '' }),
};

function render(location) {
  router.resolve({ path: location.pathname, ...context }).then((result) => {
    class MainComponent extends React.Component {
      getChildContext() {
        return {
          relay: {
            environment: context.api.environment,
            variables: {},
          }
        };
      }
      render () {
        return (
          <Provider store={store}>
            {result.component}
          </Provider>
        )
      }
    }

    MainComponent.childContextTypes = {
      relay: PropTypes.object,
    };
    ReactDOM.render(<MainComponent />, document.getElementById('root'), () => {
      document.title = result.title;
    });
  });
}

history.listen(render);
render(history.location);