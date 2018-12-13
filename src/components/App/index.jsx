import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Auth from '../Auth';
import Navbar from '../Navbar';
import Register from '../Register';
import Welcome from '../Welcome';
import Login from '../Login';
import SingleArticle from '../SingleArticle';
import CreateArticle from '../CreateArticle';
import Footer from '../Footer';
import RedirectIfAuth from '../RedirectIfAuth';
import UserArticles from '../UserArticles';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authUser: null,
      articles: [],
    };
  }

  componentWillMount() {
    const user = localStorage.getItem('user');
    if (user) {
      this.setState({
        authUser: JSON.parse(user),
      });
    }
  }

  setAuthUser = (authUser) => {
    this.setState = ({
      authUser,
    });
    localStorage.setItem('user', JSON.stringify(authUser));
    this.props.history.push('/');
  }

  setArticles = (articles) => {
    this.setState({
      articles,
    });
  }

  render() {
    const { location } = this.props;

    return (
      <div>
        {
          location.pathname !== '/login' && location.pathname !== '/register' && (
            // eslint-disable-next-line
            <Navbar authUser={this.state.authUser} />
          )
        }
        <Route
          exact
          path="/"
          render={
            props => (
              <Welcome
                {...props}
                getArticles={this.props.articlesService.getArticles}
                setArticles={this.setArticles}
              />
            )
          }
        />
        <Route
          path="/article/:slug"
          render={
            props => (
              <SingleArticle
                {...props}
                getArticle={this.props.articlesService.getArticle}
                articles={this.state.articles}
              />
            )
          }
        />
        <Auth
          path="/articles/create"
          component={CreateArticle}
          props={{
            getArticleCategories: this.props.articlesService.getArticleCategories,
            createArticle: this.props.articlesService.createArticle,
            token: this.state.authUser ? this.state.authUser.token : null,
          }}
          isAuthenticated={this.state.authUser !== null}
        />
        <Route
          path="/articles/create"
          render={
            props => (
              <CreateArticle
                {...props}
                getArticleCategories={this.props.articlesService.getArticleCategories}
                createArticle={this.props.articlesService.createArticle}
                token={this.state.authUser.token}
              />
            )
          }
        />
        <RedirectIfAuth
          path="/login"
          component={Login}
          props={{
            setAuthUser: this.setAuthUser,
            loginUser: this.props.authService.loginUser,
          }}
          isAuthenticated={this.state.authUser !== null}
        />
        <RedirectIfAuth
          path="/register"
          component={Register}
          props={{
            setAuthUser: this.setAuthUser,
            registerUser: this.props.authService.registerUser,
          }}
          isAuthenticated={this.state.authUser !== null}
        />
        <Auth
          path="/user/articles"
          component={UserArticles}
          props={{
            getUserArticles: this.props.articlesService.getUserArticles,
            setArticles: this.setArticles,
            token: this.state.authUser ? this.state.setAuthUser.token : null,
          }}
          isAuthenticated={this.state.authUser !== null}
        />
        {
          location.pathname !== '/login' && location.pathname !== '/register' && (
            <Footer />
          )
        }
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  authService: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default App;
