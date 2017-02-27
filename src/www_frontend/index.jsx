import React from 'react';
import {render} from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import {browserHistory, hashHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import configureStore from './stores/configureStore'
import rootSagas from './saga'
import Perf from 'react-addons-perf'
import Root from './Root'

const store = configureStore();
store.runSaga(rootSagas);
const history = syncHistoryWithStore(hashHistory, store);
window.Perf = Perf;

render((
	<AppContainer>
		<Root store={store} history={history} />
	</AppContainer>
), document.getElementById('app'));


if (module.hot) {
    module.hot.accept('./Root', () => {
		const NextRoot = require('./Root').default;
    	render((
			<AppContainer>
				<NextRoot store={store} history={history} />
			</AppContainer>
		), document.getElementById('app'));
    });
}