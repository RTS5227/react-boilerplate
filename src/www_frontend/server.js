import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Router from 'universal-router';
import Api from 'helpers/api';
import components from './components';
import reducer from './reducer'
import rootSagas from './saga'
import config from '../../config.json';

const store = configureStore(reducer);
store.runSaga(rootSagas);
const app = express();
const router = new Router(components);

app.get('*', (req, res) => {
  const context = {
    api: Api.create({
      baseUrl: config.graphqlServer,
      headers: req.headers,
    }),
  };
  router.resolve({ path: req.path, ...context }).then((result) => {
    class MainComponent extends React.Component {
      getChildContext() {
        return {
          relay: {
            environment: context.api.environment,
            variables: result.variables || {},
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
    const body = ReactDOM.renderToString(<MainComponent />);
    const html = ReactDOM.renderToStaticMarkup(<Html body={body} title={result.title} />);
    res.send(html);
  });
});