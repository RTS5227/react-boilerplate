import React from 'react';
import ReactDOM from 'react-dom/server';
import Api from 'libs/api';
import router from './components';
import Html from './components/Html'
import PropTypes from 'prop-types';
import config from '../config.json';

export default (req, res) => {
  const ssr = req.query['_escaped_fragments_'] || __ENABLE_SSR__;
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
  const context = {
    api: Api.create({
      baseUrl: config.graphqlServer,
      headers: req.headers,
    }),
  };
  if (!ssr) {
    // ENABLE CLIENT SIDE RENDERING
    const html = ReactDOM.renderToStaticMarkup(
      <Html
        ssr={false}
        description={config.serviceDescription}
        assets={webpackIsomorphicTools.assets()} />
    );
    res.send(`<!doctype html>${html}`);
    return;
  }
  const path = req.query['_escaped_fragments_'] || req.path;
  router.resolve({ path: path, ...context }).then((result) => {
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
    const body = ReactDOM.renderToStaticMarkup(<MainComponent />);
    const html = ReactDOM.renderToStaticMarkup(
      <Html
        children={body} ssr={true}
        assets={webpackIsomorphicTools.assets()}
        description={result.description || config.serviceDescription}
        title={result.title} />
    );
    res.send(`<!doctype html>${html}`);
  });
};