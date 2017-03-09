import React from 'react';
import {render} from 'react-dom';
import Perf from 'react-addons-perf'
import { browserHistory, hashHistory, Router } from 'react-router'
import IsomorphicRelay from 'isomorphic-relay'
import Relay from 'react-relay';
import routes from './routes'

window.Perf = Perf;

// A wrapper to create a Relay container
function createRelayContainer(Component, props) {
  if (Relay.isContainer(Component)) {
    // Construct the RelayQueryConfig from the route and the router props.
    var {name, queries} = props.route;
    var {params} = props;
    return (
      <Relay.RootContainer
        Component={Component}
        renderFetched={(data) => <Component {...props} {...data} />}
        route={{name, params, queries}}
      />
    );
  } else {
    return <Component {...props}/>;
  }
}

render(
  <Router 
    history={hashHistory}
    children={routes}
    createElement={createRelayContainer}
   />, document.getElementById('root') 
)