import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import CreateArticle from './components/CreateArticle';
import Login from './components/Login';
import SingleArticle from './components/SingleArticle';
import Register from './components/Register';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    
    <BrowserRouter>
        <div>
            <Route path={`/(article|articles/create|)`} component={Navbar}/>
            <div>
                <Route exact path='/' component={Welcome}/>
                <Route path='/article' component={SingleArticle}/>
                <Route path='/articles/create' component={CreateArticle}/>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
            </div>
            <Route path={`/(article|articles/create|)`} component={Footer}/>        
        </div>
    </BrowserRouter>

    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
