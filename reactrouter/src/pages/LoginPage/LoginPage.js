import React, { Component } from 'react';
import Login from '../../components/Login/Login';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../actions/index';
import * as errorMessages from '../../constants/ErrorMessageHandle';
import * as typeErrors from '../../constants/ErrorType';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../firebase';
import LoadingButton from '../../components/Loading/LoadingButton';
import NotifiModal from '../../components/NotifiModal/NotifiModal';
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
            isError: false,
            isLogin: false,
            isLoading: false,
            errorMessage: "",
        }
    }
    onLoading = () => {
        this.setState({
            isLoading: true,
        })
         //console.log('loading');
    }
    onSignInUsingGoogle = async () => {
        await this.onLoading();
        await firebase.auth().signInWithPopup(provider).catch(error => {
            var errorMessage = error.message;
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
                // isLogin: true,
                isLoading: false,
            });
        }
    }
    onLogin = async (account) => {
        await  this.onLoading();
        await firebaseApp.auth().signInWithEmailAndPassword(account.username, account.password).catch(error => {

           
            // Handle Errors here.
            let errorMessage = error.message;
            const errorCode = error.code;
            switch (errorCode) {
                case typeErrors.USER_DISABLE:
                    errorMessage = errorMessages.USER_DISABLE;
                    break;
                case typeErrors.USER_NOT_FOUND:
                    errorMessage = errorMessages.USER_NOT_FOUND;
                    break;
                case typeErrors.NETWORK_REQUEST_FAILED:
                    errorMessage = errorMessages.NETWORK_REQUEST_FAILED;
                    break;
                case typeErrors.WRONG_PASSWORD:
                    errorMessage = errorMessages.WRONG_PASSWORD;
                    break;
                case typeErrors.INVALID_EMAIL:
                    errorMessage = errorMessages.INVALID_EMAIL;
                    break;
                default:
                    break;
            }
            console.log(error.code);
            this.setState({
                isError: true,
                errorMessage: errorMessage,
                isLoading: false,
            }, () => console.log('end load failed'))
        });
        if (this.state.isError === false) {
            let user = firebase.auth().currentUser;
            let account = { "username": user.displayName, "email": user.email };
            await this.props.Login(account);
            this.setState({
                //   isLogin: true,
                isLoading: false,
            }, () => console.log('end load success'));
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
        console.log('render');
        let user = JSON.parse(localStorage.getItem('USER'));
        const { isLoading, isError, errorMessage } = this.state;
        console.log('loading:' + isLoading);
        // console.log(user);
        if (user) {
            //  console.log(user);
            console.log("redirect");
            return <Redirect to="/" />
        }
        return (
            <React.Fragment>
                {isLoading ? (
                    <LoadingButton />
                )
                    :
                    <React.Fragment>
                        <Login
                            onLogin={this.onLogin}
                            isError={isError}
                            errorMessage={errorMessage}
                            onSignInUsingGoogle={this.onSignInUsingGoogle}
                        />
                        <NotifiModal
                            isOpen={isError}
                            errorMessage={errorMessage}
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
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
// export default connect(mapStateToProps, mapDispatchToProps) (withFirebaseAuth)({
//     providers,
//     firebaseAppAuth,
// })(LoginPage);