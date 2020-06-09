/* eslint-disable react/no-deprecated */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as firebase from 'firebase/app';
import * as actions from '../../actions/auth';
import SignUp from '../../components/SignUp/SignUp';
import 'firebase/auth';
import firebaseConfig from '../../firebase';
import * as errMessage from '../../constants/ErrorMessageHandle';
import errorCode from '../../constants/errCode';
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

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (nextProps.dataSignUp.err === errorCode.ECONNREFUSED) {
        this.setState({
          isLoading: false,
          isError: true,
          errorMessage: errMessage.ECONNREFUSED,
        });
      } else if (nextProps.dataSignUp.data.errCode === errorCode.REGISTERED_FAILED) {
        this.setState({
          isError: true,
          errorMessage: nextProps.dataSignUp.data.message,
          isLoading: false,
        });
      } else {
        this.setState({
          isSignup: true,
        });
      }
    }
  }

    // eslint-disable-next-line react/sort-comp
    onLoading = () => {
      this.setState({
        isLoading: true,
      });
      // console.log('loading');
    }


    onSignup = async (account) => {
      await this.onLoading();
      if (account.password !== account.repassword) {
        this.setState({
          isError: true,
          errorMessage: errMessage.REPASSWORD_NOT_SAME,
          isLoading: false,
        });
      } else {
        const { SignUp } = this.props;
        await SignUp(account);
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
          <Redirect to="/verify" />
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
const mapStateToProps = (state) => ({
  dataSignUp: state.SignUp,
});
const mapDispatchToProps = (dispatch) => ({
  SignUp: (account) => {
    dispatch(actions.signUpRequest(account));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
