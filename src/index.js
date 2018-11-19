import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import Footer from './components/Footer';

import * as serviceWorker from './serviceWorker';

const Home = () => {
    return <h1>THIS IS THE HOME PAGE</h1>
};

const About = () => {
    return <h1>THIS IS THE ABOUT PAGE</h1>
};

ReactDOM.render(
    
    <BrowserRouter>
        <div>
            <Navbar/>
            <Route exact path='/' component={Welcome}/>
            <Route path='/about' component={About}/>
            <Route path='/home' component={Home}/>
            <Footer/>
        </div>
    </BrowserRouter>

    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
