import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import store from './dux/store'

ReactDOM.render(
<<<<<<< HEAD
<BrowserRouter>
    <App />
</BrowserRouter>

=======
    <Provider store={store}>
        <App />
    </Provider>
>>>>>>> be7ade2d08706e42990b50cb98c3c18ee8ed66b3
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
