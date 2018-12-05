import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';

import AuthService from './services/auth';

import * as serviceWorker from './serviceWorker';

const Main = withRouter(( props ) => {
    return (
        <App authService={new AuthService()} { ...props }/>
    );
});

ReactDOM.render(
    
    <BrowserRouter>
        <Main/>
    </BrowserRouter>

    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
