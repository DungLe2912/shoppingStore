import React, { Component } from 'react';
import Login from '../../components/Login/Login';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../actions/index';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../firebase';
let firebaseApp = firebase;
if (!firebase.apps.length) {
    firebaseApp = firebase.initializeApp(firebaseConfig);
}
var provider = new firebase.auth.GoogleAuthProvider();
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
// firebase.auth().languageCode = 'pt';
provider.setCustomParameters({
    'login_hint': 'user@example.com'
  });

// const firebaseAppAuth = firebaseApp.auth();
// const providers = {
//     googleProvider: new firebase.auth.GoogleAuthProvider(),
// };

//const firebaseApp = firebase.initializeApp(firebaseConfig);
class LoginPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isOpen: false,
            isLogin: false,
            errorMessage: "",
        }
    }

    onSignInUsingGoogle = async () => {
       await firebase.auth().signInWithPopup(provider).catch(error=> {
            var errorMessage = error.message;
            this.setState({
                isOpen: true,
                errorMessage: errorMessage,
            }, () => console.log(this.state.isOpen))
          });
          if (this.state.isOpen === false) {
            let user = firebase.auth().currentUser;
            let account = { "username": user.displayName, "email": user.email };
            await this.props.Login(account);
            this.setState({
                isLogin: true,
            });
        }
    }
    onLogin = async (account) => {

        // try {
        //     firebase.auth().signInWithEmailAndPassword(account.username, account.password);

        // }catch (error) {
        //    console.log('error');
        // }
        await firebaseApp.auth().signInWithEmailAndPassword(account.username, account.password).catch(error => {
            // Handle Errors here.
            var errorMessage = error.message;
            console.log(errorMessage);
            this.setState({
                isOpen: true,
                errorMessage: errorMessage,
            }, () => console.log(this.state.isOpen))
        });
        if (this.state.isOpen === false) {
            let user = firebase.auth().currentUser;
            let account = { "username": user.displayName, "email": user.email };
            await this.props.Login(account);
            this.setState({
                isLogin: true,
            });
        }
    }
    onClose=()=>{
        this.setState({
            isOpen:false,
        })
    }
    render() {
        console.log(this.state);
        let user = JSON.parse(localStorage.getItem('USER'));
        // console.log(user);
        if (user) {
            //  console.log(user);
            console.log("redirect");
            return <Redirect to="/" />
        }
        return (
            <div>
                <Login
                    onLogin={this.onLogin}
                    isOpen={this.state.isOpen}
                    errorMessage={this.state.errorMessage}
                    onSignInUsingGoogle={this.onSignInUsingGoogle}
                    onClose={this.onClose}
                />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        Login: (account) => {
            dispatch(actions.Login(account));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
// export default connect(mapStateToProps, mapDispatchToProps) (withFirebaseAuth)({
//     providers,
//     firebaseAppAuth,
// })(LoginPage);