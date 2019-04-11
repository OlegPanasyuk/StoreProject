import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Catalogue from './Catalogue/Catalogue';
import LoginForm from './LoginForm/LoginForm';
import * as serviceWorker from './serviceWorker';



ReactDOM.render(
    <React.Fragment>
        <LoginForm>
            Log in me now!!!
        </LoginForm>
        <Catalogue />
    </React.Fragment>
    
    , document.getElementById('root')
);




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
