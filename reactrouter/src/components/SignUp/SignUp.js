/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NotifiModal from '../NotifiModal/NotifiModal';
class SignUp extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            txtName: "",
            txtUsername: "",
            txtPassword: "",
            txtRePassword: "",
        }
    }
    onChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        });
    }
    onClose = () => {
        this.props.onClose();
        this.setState({
            txtName: "",
            txtUsername: "",
            txtPassword: "",
            txtRePassword: "",
        })
    }
    onSave = (e) => {
        e.preventDefault();
        const name = this.state.txtName;
        const username = this.state.txtUsername;
        const password = this.state.txtPassword;
        const repassword = this.state.txtRePassword;
        const account = {name, username, password, repassword };
        this.onSignup(account);
    }
    onSignup = (account) => {
        this.props.onSignup(account);
    }
    onSignInUsingGoogle = () => {
        this.props.onSignInUsingGoogle();
    }
    render() {
        const { txtUsername, txtPassword, txtRePassword, txtName} = this.state;
        return (
            <div className="container ">
                <div className="row">
                    <div className="col-md-5 mx-auto">
                        <div id="first">
                            <div className="myform form ">
                                <div className="logo mb-3">
                                    <div className="col-md-12 text-center">
                                        <h1>Sign up</h1>
                                    </div>
                                </div>
                                <form onSubmit={this.onSave}>
                                    <div className="form-group">
                                        <label>Name:</label>
                                        <input type="text" name="txtName" className="form-control" value={txtName} placeholder="Enter your name" onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input type="email" name="txtUsername" className="form-control" value={txtUsername} placeholder="Enter email" onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Password:</label>
                                        <input type="password" name="txtPassword" className="form-control" value={txtPassword} placeholder="Enter Password" onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Re-password:</label>
                                        <input type="password" name="txtRePassword" className="form-control" value={txtRePassword} placeholder="Enter Re-Password" onChange={this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <p className="text-center">By signing up you accept our <a>Terms Of Use</a></p>
                                    </div>
                                    <div className="col-md-12 text-center ">
                                        <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm">Sign up</button>
                                    </div>
                                    <div className="col-md-12 ">
                                        <div className="login-or">
                                            <hr className="hr-or" />
                                            <span className="span-or">or</span>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-3 ">
                                        <p className="text-center" onClick={() => this.onSignInUsingGoogle()}>
                                            <a className="google btn mybtngg"><i className="fa fa-google-plus">
                                            </i> Sign-in using Google
                                     </a>
                                        </p>
                                    </div>
                                    <div className="form-group">
                                        <p className="text-center">You have account? <Link to={'/login'} id="signup">Sign-in here</Link></p>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
                <NotifiModal
                    isOpen={this.props.isError}
                    errorMessage={this.props.errorMessage}
                    onClose={this.onClose}
                />
            </div>

        );
    }
}

export default SignUp;