import React from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';

import {validateAll} from 'indicative';
import config from '../../config';

class Register extends React.Component {
    constructor(){
        super();

        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: {}
        };

        
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault()
        
        const data = this.state;
        const rules = {
            name: 'required|string',
            email: 'required|email',
            password: 'required|string|min:6|confirmed'
        };

        const messages = {
            required: 'The {{ field }} is required.',
            'email.email': 'The email is invalid.',
            'password.confirmed': 'The password confirmaton does not match.'
        };

        validateAll(data, rules, messages)
            .then(() => {
                Axios.post(`${config.apiUrl}/auth/register`, {
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                }).then(response => {
                    localStorage.setItem('user', JSON.stringify(response.data.data))
                    this.props.history.push('/');
                }).catch(errors => {
                    console.log(errors.response)
                    const formattedErrors = {};
                    formattedErrors['email'] = errors.response.data['email'][0];
                    this.setState({
                        errors: formattedErrors
                    });
                })
            })
            .catch(errors => {
                const formattedErrors = {}
                errors.forEach(error => formattedErrors[error.field] = error.message)
                this.setState({
                    errors: formattedErrors
                })
            })
    }

    render(){
        return (
            <div className="mh-fullscreen bg-img center-vh p-20" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/bg-girl.jpg)`}}>
                <div className="card card-shadowed p-50 w-400 mb-0" style={{maxWidth: '100%'}}>
                    <h5 className="text-uppercase text-center">Register</h5>
                    <br />
                    <br />
                    <form className="form-type-material" onSubmit={ this.handleSubmit } >
                        <div className="form-group">
                            <input type="text" name="name" onChange={this.handleInputChange} className="form-control" placeholder="Username" />
                            {
                                this.state.errors['name'] &&
                                <small className="text-danger">{ this.state.errors['name'] }</small>
                            }
                        </div>
                        <div className="form-group">
                            <input type="text" name="email" onChange={this.handleInputChange} className="form-control" placeholder="Email address" />
                            {
                                this.state.errors['email'] &&
                                <small className="text-danger">{ this.state.errors['email'] }</small>
                            }
                        </div>
                        <div className="form-group">
                            <input type="password" name="password" onChange={this.handleInputChange} className="form-control" placeholder="Password" />
                            {
                                this.state.errors['password'] &&
                                <small className="text-danger">{ this.state.errors['password'] }</small>
                            }
                        </div>
                        <div className="form-group">
                            <input type="password" name="password_confirmation" onChange={this.handleInputChange} className="form-control" placeholder="Password (confirm)" />
                            {
                                this.state.errors['password_confirmation'] &&
                                <small className="text-danger">{ this.state.errors['password_confirmation'] }</small>
                            }
                        </div>
                        <br />
                        <button className="btn btn-bold btn-block btn-primary" type="submit">Register</button>
                    </form>
                    <hr className="w-30" />
                    <p className="text-center text-muted fs-13 mt-20">Already have an account?
                        <Link to="/login">Sign in</Link>
                    </p>
                </div>
            </div>
        );
    }
};

export default Register;