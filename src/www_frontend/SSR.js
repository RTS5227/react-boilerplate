import React from 'react';
import ReactDOM from 'react-dom/server';
import Router from 'universal-router';
import Api from 'helpers/api';
import components from './components';
import Html from './components/Html'
import PropTypes from 'prop-types';
// import reducer from './reducer'
// import rootSagas from './saga'
import config from '../config.json';

/*const store = configureStore(reducer);
store.runSaga(rootSagas);
const app = express();*/
const router = new Router(components);

export default (req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }    
  if (__DISABLE_SSR__) { // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
    const html = ReactDOM.renderToStaticMarkup(
      <Html 
        scripts={['SSR.js']} 
        assets={webpackIsomorphicTools.assets()}
        title={result.title} />
    );
    res.send(`<!doctype html>${html}`);
    return;
  }
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
        return result.component
      }
    }

    MainComponent.childContextTypes = {
      relay: PropTypes.object,
    };
    const body = ReactDOM.renderToString(<MainComponent />);
    const html = ReactDOM.renderToStaticMarkup(
      <Html 
        scripts={['SSR.js']} 
        children={body} 
        assets={webpackIsomorphicTools.assets()}
        title={result.title} />
    );
    res.send(`<!doctype html>${html}`);
  });
};