import React, { Component } from 'react';
import SignUp from '../../components/SignUp/SignUp';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../actions/index';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../firebase';
import * as errorMessages from '../../constants/ErrorMessageHandle';
import * as typeErrors from '../../constants/ErrorType';
import NotifiModal from '../../components/NotifiModal/NotifiModal';
import LoadingScreen from '../../components/Loading/LoadingScreen';
let firebaseApp = firebase;
//const firebaseApp = firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
    firebaseApp = firebase.initializeApp(firebaseConfig);
}
var provider = new firebase.auth.GoogleAuthProvider();
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
// firebase.auth().languageCode = 'pt';
provider.setCustomParameters({
    'login_hint': 'user@example.com'
});

class SignupPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isSignup: false,
            isError: false,
            errorMessage: "",
            isSignupGoogle: false,
            isLoading: false,
        }
    }
    onLoading = () => {
        this.setState({
            isLoading: true,
        })
        //console.log('loading');
    }
    componentWillMount() {
        const { history } = this.props;
        let user = JSON.parse(localStorage.getItem('USER'));
        if (user !== null) {
            history.goBack();
        }
    }
    onSignup = async (account) => {
        if (account.password !== account.repassword) {
            this.setState({
                isError: true,
                errorMessage: errorMessages.REPASSWORD_NOT_SAME,
            })
        }
        else {
            await this.onLoading();
            await firebaseApp.auth().createUserWithEmailAndPassword(account.username, account.password).catch(error => {
                let errorMessage = error.message;
                const errorCode = error.code;
                switch (errorCode) {
                    case typeErrors.WEAK_PASSWORD:
                        errorMessage = errorMessages.WEAK_PASSWORD;
                        break;
                    case typeErrors.EMAIL_ALREADY_IN_USE:
                        errorMessage = errorMessages.EMAIL_ALREADY_IN_USE;
                        break;
                    case typeErrors.NETWORK_REQUEST_FAILED:
                        errorMessage = errorMessages.NETWORK_REQUEST_FAILED;
                        break;
                    case typeErrors.INVALID_EMAIL:
                        errorMessage = errorMessages.INVALID_EMAIL;
                        break;
                    default:
                        break;
                }
                this.setState({
                    isError: true,
                    errorMessage: errorMessage,
                    isLoading: false,
                })

            });
            if (this.state.isError === false) {
                const user = firebase.auth().currentUser;
                await user.updateProfile({
                    displayName: account.name,
                }).then(() => {
                    this.setState({
                        isSignup: true,
                        isLoading: false,
                    }, () => {
                        console.log(this.state.isSignup);
                    })
                }).catch(function (error) {
                    console.log(error);
                });

            }
        }

    }
    onSignInUsingGoogle = async () => {
        console.log('sign in using gg');
        await this.onLoading();
        await firebase.auth().signInWithPopup(provider).catch(error => {
            const errorMessage = error.message;
            console.log(error.code)
            this.setState({
                isError: true,
                errorMessage: errorMessage,
                isLoading: false,
            }, () => console.log(this.state.isError))
        });
        if (this.state.isError === false) {

            let user = firebase.auth().currentUser;
            let account = { "username": user.displayName, "email": user.email };
            await this.props.Login(account);
            this.setState({
                isSignupGoogle: true,
                isLoading: false,
            });
        }
    }
    onClose = () => {
        this.setState({
            isError: false,
            isLoading: false,
            errorMessage: "",
        })
    }
    render() {
        const { isLoading } = this.state;
        if (this.state.isSignup === true) {
            return (
                <Redirect to="/login" />
            )
        }
        if (this.state.isSignupGoogle === true) {

            return (
                <Redirect to="/" />
            )
        }
        return (
            <React.Fragment>
                {isLoading ? (
                    <LoadingScreen />
                )
                    :
                    <React.Fragment>
                        <SignUp onSignup={this.onSignup}
                            errorMessage={this.state.errorMessage}
                            isError={this.state.isError}
                            onSignInUsingGoogle={this.onSignInUsingGoogle}

                        />
                        <NotifiModal
                            isOpen={this.state.isError}
                            errorMessage={this.state.errorMessage}
                            onClose={this.onClose}
                        />
                    </React.Fragment>
                }
            </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);