import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as firebase from 'firebase/app';
import * as actions from '../../actions/products';
import SignUp from '../../components/SignUp/SignUp';
import 'firebase/auth';
import firebaseConfig from '../../firebase';
import * as errorMessages from '../../constants/ErrorMessageHandle';
import * as typeErrors from '../../constants/ErrorType';
import NotifiModal from '../../components/NotifiModal/NotifiModal';
import LoadingScreen from '../../components/Loading/LoadingScreen';

let firebaseApp = firebase;
if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp(firebaseConfig);
}
const provider = new firebase.auth.GoogleAuthProvider();
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
// firebase.auth().languageCode = 'pt';
provider.setCustomParameters({
  login_hint: 'user@example.com',
});

class SignupPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isSignup: false,
      isError: false,
      errorMessage: '',
      isSignupGoogle: false,
      isLoading: false,
    };
  }

    // eslint-disable-next-line react/sort-comp
    onLoading = () => {
      this.setState({
        isLoading: true,
      });
      // console.log('loading');
    }

    // eslint-disable-next-line react/no-deprecated
    componentWillMount() {
      // eslint-disable-next-line react/prop-types
      const { history } = this.props;
      const user = JSON.parse(localStorage.getItem('USER'));
      if (user !== null) {
        // eslint-disable-next-line react/prop-types
        history.goBack();
      }
    }

    onSignup = async (account) => {
      if (account.password !== account.repassword) {
        this.setState({
          isError: true,
          errorMessage: errorMessages.REPASSWORD_NOT_SAME,
        });
      } else {
        await this.onLoading();
        // await firebaseApp.auth().createUserWithEmailAndPassword(account.username, account.password)
        //   .catch((error) => {
        //     let errorMessage = error.message;
        //     const errorCode = error.code;
        //     switch (errorCode) {
        //       case typeErrors.WEAK_PASSWORD:
        //         errorMessage = errorMessages.WEAK_PASSWORD;
        //         break;
        //       case typeErrors.EMAIL_ALREADY_IN_USE:
        //         errorMessage = errorMessages.EMAIL_ALREADY_IN_USE;
        //         break;
        //       case typeErrors.NETWORK_REQUEST_FAILED:
        //         errorMessage = errorMessages.NETWORK_REQUEST_FAILED;
        //         break;
        //       case typeErrors.INVALID_EMAIL:
        //         errorMessage = errorMessages.INVALID_EMAIL;
        //         break;
        //       default:
        //         break;
        //     }
        //     this.setState({
        //       isError: true,
        //       errorMessage,
        //       isLoading: false,
        //     });
        //   });
        
        const { isError } = this.state;
        if (isError === false) {
          const user = firebase.auth().currentUser;
          await user.updateProfile({
            displayName: account.name,
          }).then(() => {
            this.setState({
              isSignup: true,
              isLoading: false,
            }, () => {
            });
          }).catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error);
          });
        }
      }
    }

    // onSignInUsingGoogle = async () => {
    //   // eslint-disable-next-line no-console
    //   console.log('sign in using gg');
    //   await this.onLoading();
    //   await firebase.auth().signInWithPopup(provider).catch((error) => {
    //     const errorMessage = error.message;
    //     // eslint-disable-next-line no-console
    //     console.log(error.code);
    //     this.setState({
    //       isError: true,
    //       errorMessage,
    //       isLoading: false,
    //     });
    //   });
    //   const { isError } = this.state;
    //   // eslint-disable-next-line react/prop-types
    //   const { Login } = this.props;
    //   if (isError === false) {
    //     const user = firebase.auth().currentUser;
    //     const account = { username: user.displayName, email: user.email };
    //     await Login(account);
    //     this.setState({
    //       isSignupGoogle: true,
    //       isLoading: false,
    //     });
    //   }
    // }

    onClose = () => {
      this.setState({
        isError: false,
        isLoading: false,
        errorMessage: '',
      });
    }

    render() {
      const {
        isLoading, isSignup, isSignupGoogle, errorMessage, isError,
      } = this.state;
      if (isSignup === true) {
        return (
          <Redirect to="/login" />
        );
      }
      if (isSignupGoogle === true) {
        return (
          <Redirect to="/" />
        );
      }
      return (
        <>
          {isLoading ? (
            <LoadingScreen />
          )
            : (
              <>
                <SignUp
                  onSignup={this.onSignup}
                  errorMessage={errorMessage}
                  isError={isError}
                  onSignInUsingGoogle={this.onSignInUsingGoogle}
                />
                <NotifiModal
                  isOpen={isError}
                  errorMessage={errorMessage}
                  onClose={this.onClose}
                />
              </>
            )}
        </>
      );
    }
}
const mapStateToProps = () => ({

});
const mapDispatchToProps = (dispatch) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
