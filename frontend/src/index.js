import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    Route, Switch
} from 'react-router-dom';

import App from './App';
import AdminPanelContainer from './containers/AdminPanel/AdminPanel';
import * as serviceWorker from './serviceWorker';
import 'jquery';
import 'bootstrap';
import './asserts/css/bootstrap.min.css';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path='/adminpanel' component={AdminPanelContainer} />
                <Route path='/' component={App} />
            </Switch>
        </Router>
    </Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
