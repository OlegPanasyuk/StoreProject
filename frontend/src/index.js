import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Catalogue from './Catalogue/Catalogue';
import * as serviceWorker from './serviceWorker';
import { exportAllDeclaration } from '@babel/types';



ReactDOM.render(
        <Catalogue />
    , document.getElementById('root')
);




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
