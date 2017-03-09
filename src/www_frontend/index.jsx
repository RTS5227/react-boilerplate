import React from 'react';
import {render} from 'react-dom';
import Perf from 'react-addons-perf'
import { browserHistory, match, Router } from 'react-router'
import IsomorphicRelay from 'isomorphic-relay'
import routes from './routes'

window.Perf = Perf;


const environment = new Relay.Environment();
environment.injectNetworkLayer(new Relay.DefaultNetworkLayer('/graphql'));

// Deserialize the data preloaded on the server.
const data = JSON.parse(document.getElementById('preloadedData').textContent);

// Use IsomorphicRelay.injectPreparedData() to inject the data into the Relay cache,
// so Relay doesn't need to make GraphQL requests to fetch the data.
IsomorphicRelay.injectPreparedData(environment, data);

match( {
    routes,
    history: browserHistory
  },
  ( error, redirectLocation, renderProps ) => {
  	// Use IsomorphicRelay.prepareInitialRender() to wait until all the required data
	// is ready for rendering of the Relay container.
	// Note that it is important to use the same rootContainerProps as on the server to
	// avoid additional GraphQL requests.
    IsomorphicRouter.prepareInitialRender( environment, renderProps ).then( props => {
	  // Use <IsomorphicRelay.Renderer> to render your Relay container when the data is ready.
	  // Like on the server we cannot use the standard <Relay.Renderer>, bacause here
	  // we also need to render normally right at the initial render, otherwise we would get
	  // React markup mismatch with the markup prerendered on the server.
      render( <Router {...props } />, document.getElementById('root') )
    } )
  }
)