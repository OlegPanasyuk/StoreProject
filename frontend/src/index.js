import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import RegForm from './RegistrForm/RegistrForm';
import AdminPanel from './AdminPanel/AdminPanel';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import 'jquery';
import 'bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './asserts/css/bootstrap.min.css';
//import './css/bootstrap.css';
import store from './REDUX/store';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path='/adminpanel' component={AdminPanel} />
                <Route path='/registration' component={RegForm} />
                <Route path='/login' component={RegForm} />
                <Route path='/' component={App} />
            </Switch>
        </Router>
    </Provider>
    , document.getElementById('root')
);




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
