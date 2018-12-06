import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Register extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: {},
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // eslint-disable-next-line
      const user = await this.props.registerUser(this.state);

      localStorage.setItem('user', JSON.stringify(user));
      // eslint-disable-next-line
      this.props.setAuthUser(user);
      // eslint-disable-next-line
      this.props.history.push('/');
    } catch (errors) {
      this.setState({
        errors,
      });
    }
  }

  render() {
    return (
      <div className="mh-fullscreen bg-img center-vh p-20" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/bg-girl.jpg)` }}>
        <div className="card card-shadowed p-50 w-400 mb-0" style={{ maxWidth: '100%' }}>
          <h5 className="text-uppercase text-center">Register</h5>
          <br />
          <br />
          <form className="form-type-material" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" name="name" onChange={this.handleInputChange} className="form-control" placeholder="Username" />
              {
                // eslint-disable-next-line
                this.state.errors.name && (
                  // eslint-disable-next-line
                  <small className="text-danger">{ this.state.errors['name'] }</small>
                )
              }
            </div>
            <div className="form-group">
              <input type="text" name="email" onChange={this.handleInputChange} className="form-control" placeholder="Email address" />
              {
                // eslint-disable-next-line
                this.state.errors['email'] && (
                  // eslint-disable-next-line
                  <small className="text-danger">{ this.state.errors['email'] }</small>
                )
              }
            </div>
            <div className="form-group">
              <input type="password" name="password" onChange={this.handleInputChange} className="form-control" placeholder="Password" />
              {
                // eslint-disable-next-line
                this.state.errors['password'] && (
                  // eslint-disable-next-line
                  <small className="text-danger">{ this.state.errors['password'] }</small>
                )
              }
            </div>
            <div className="form-group">
              <input type="password" name="password_confirmation" onChange={this.handleInputChange} className="form-control" placeholder="Password (confirm)" />
              {
                // eslint-disable-next-line
                this.state.errors['password_confirmation'] && (
                  // eslint-disable-next-line
                  <small className="text-danger">{ this.state.errors['password_confirmation'] }</small>
                )
              }
            </div>
            <br />
            <button className="btn btn-bold btn-block btn-primary" type="submit">Register</button>
          </form>
          <hr className="w-30" />
          <p className="text-center text-muted fs-13 mt-20">
            Already have an account?
            <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    );
  }
}

Register.propType = {
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Register;
