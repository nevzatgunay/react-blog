import React from 'react';
import PropTypes from 'prop-types';

const Login = ({ handleInputChange, handleSubmit }) => {
  return (
    <div className="mh-fullscreen bg-img center-vh p-20" style={{ backgroundImage: 'url(assets/img/bg-girl.jpg)' }}>
      <div className="card card-shadowed p-50 w-400 mb-0" style={{ maxWidth: '100%' }}>
        <h5 className="text-uppercase text-center">Login</h5>
        <br />
        <br />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" name="email" className="form-control" placeholder="Username" onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <input type="password" name="password" className="form-control" placeholder="Password" onChange={handleInputChange} />
          </div>
          <div className="form-group flexbox py-10">
            <label htmlFor="rememberme" className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" defaultChecked />
              <span className="custom-control-indicator" />
              <span className="custom-control-description">Remember me</span>
            </label>
            <button className="text-muted hover-primary fs-13" href="#" type="button">
            Forgot password?
            </button>
          </div>
          <div className="form-group">
            <button className="btn btn-bold btn-block btn-primary" type="submit">Login</button>
          </div>
        </form>
        <hr className="w-30" />
        <p className="text-center text-muted fs-13 mt-20">
        Don&apos;t have an account?
          <a href="register.html">Sign up</a>
        </p>
      </div>
    </div>
  );
};

Login.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default Login;
