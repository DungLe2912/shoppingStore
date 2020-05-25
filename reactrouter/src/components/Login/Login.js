import React, { Component } from 'react';
import NotifiModal from './NotifiModal';
class Login extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            txtUsername:"",
            txtPassword:""
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
    onSave = (e) => {
        e.preventDefault();
        const username = this.state.txtUsername;
        const password = this.state.txtPassword;
        const account = {username,password};
        this.onLogin(account);
    }
    onLogin=(account)=>{
        this.props.onLogin(account);
    }
    render() {
        const {txtUsername,txtPassword} = this.state;
        return (
            <div className="container ">
                <div className="row">
                    <div className="col-md-5 mx-auto">
                        <div id="first">
                            <div className="myform form ">
                                <div className="logo mb-3">
                                    <div className="col-md-12 text-center">
                                        <h1>Login</h1>
                                    </div>
                                </div>
                                <form onSubmit={this.onSave}>
                                    <div className="form-group">
                                        <label>Username:</label>
                                        <input type="text" name="txtUsername" className="form-control" value={txtUsername} placeholder="Enter Username" onChange={this.onChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" name="txtPassword"  className="form-control" value={txtPassword}  placeholder="Enter Password" onChange={this.onChange}/>
                                    </div>
                                    <div className="form-group">
                                        <p className="text-center">By signing up you accept our <a href="#">Terms Of Use</a></p>
                                    </div>
                                    <div className="col-md-12 text-center ">
                                        <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm">Login</button>
                                    </div>
                                    <div className="col-md-12 ">
                                        <div className="login-or">
                                            <hr className="hr-or" />
                                            <span className="span-or">or</span>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <p className="text-center">
                                            <a  className="google btn mybtn"><i className="fa fa-google-plus">
                                            </i> Signup using Google
                                     </a>
                                        </p>
                                    </div>
                                    <div className="form-group">
                                        <p className="text-center">Don't have account? <a href="#" id="signup">Sign up here</a></p>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
                <NotifiModal isOpen={this.props.isOpen}/>
            </div>
           
        );
    }
}

export default Login;