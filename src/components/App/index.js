import React from 'react';
import PropTypes from 'prop-types';

import Navbar from '../Navbar';
import Register from '../Register';
import Welcome from '../Welcome';
import Login from '../Login';
import SingleArticle from '../SingleArticle';
import CreateArticle from '../CreateArticle';
import Footer from '../Footer';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      authUser: null,
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
  }

  render() {
    const { location } = this.props;

    return (
      <div>
        {
          location.pathname !== '/login' && location.pathname !== '/register' &&
          <Navbar authUser={this.state.authUser}/>
        }
        <Route exact path='/' component={Welcome}/>
        <Route path='/article' component={SingleArticle}/>
        <Route path='/articles/create' component={CreateArticle}/>
        <Route path='/login' component={Login}/>
        <Route
          path='/register'
          render={
          props => (<Register
            {...props}
            registerUser={this.props.authService.registerUser}
            setAuthUser={ this.setAuthUser }
            />)
          }
        />
        {
          location.pathname !== '/login' && location.pathname !== '/register' &&
          <Footer/>
        }
        </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  authService: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default App;