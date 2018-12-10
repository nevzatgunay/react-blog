import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, withRouter } from 'react-router-dom';

import AuthService from './services/auth';
import ArticlesService from './services/articles';
import App from './components/App';
import * as registerServiceWorker from './registerServiceWorker';

const Main = withRouter(props => ((
  <App
    authService={new AuthService()}
    articlesService={new ArticlesService()}
    {...props}
  />
)));

ReactDOM.render(
  <BrowserRouter>
    <Main />
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
registerServiceWorker.unregister();
