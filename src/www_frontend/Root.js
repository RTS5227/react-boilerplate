import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import Api from 'libs/api';
import history from 'libs/history';
import PropTypes from 'prop-types';
import config from '../config.json';

const context = {
  api: Api.create({ baseUrl: config.graphqlServer })
};

class Root extends React.Component {
  state = { result: {component: <div />, variables: {}} }

  static propTypes = {
    store: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  }

  componentWillMount() {
    history.listen(this.onLocationChange);
    this.onLocationChange(history.location);
  }

  onLocationChange = location => {
    const {router} = this.props;
    router.resolve({ path: location.pathname, ...context }).then(result => {
      this.setState({result}, () => {
        document.title = result.title;
      });
    });
  }

  getChildContext() {
    const { result } = this.state;
    return {
      relay: {
        environment: context.api.environment,
        variables: result.variables || {},
      }
    };
  }

  render () {
    const {store} = this.props;
    const {result} = this.state;
    return (
      <Provider store={store}>
        {result.component}
      </Provider>
    )
  }
}

Root.childContextTypes = {
  relay: PropTypes.object,
};

export default Root;