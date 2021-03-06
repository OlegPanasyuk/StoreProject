import { createStore } from 'redux';
import rootReducers from '../reducers';

export default createStore(
    rootReducers,
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
