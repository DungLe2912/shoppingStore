/* eslint-disable quote-props */
/* eslint-disable react/no-deprecated */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as firebase from 'firebase/app';
import Login from '../../components/Login/Login';
import * as actions from '../../actions/auth';
import 'firebase/auth';
import firebaseConfig from '../../firebase';
import LoadingScreen from '../../components/Loading/LoadingScreen';
import NotifiModal from '../../components/NotifiModal/NotifiModal';
import { defaultHeader } from '../../constants/Config';
import errorCode from '../../constants/errCode';
import * as errMessage from '../../constants/ErrorMessageHandle';

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

// const firebaseAppAuth = firebaseApp.auth();
// const providers = {
//     googleProvider: new firebase.auth.GoogleAuthProvider(),
// };


class LoginPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isError: false,
      isLoading: false,
      errorMessage: '',
    };
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (nextProps.dataLogin.err === errorCode.ECONNREFUSED) {
        this.setState({
          isLoading: false,
          isError: true,
          errorMessage: errMessage.ECONNREFUSED,
        });
      } else if (nextProps.dataLogin.data.errCode === errorCode.LOGIN_FAIL) {
        this.setState({
          isError: true,
          errorMessage: nextProps.dataLogin.data.message,
          isLoading: false,
        });
      } else {
        const token = JSON.parse(localStorage.getItem('TOKEN'));
        if (token !== '') {
          this.onGetInforUser(token);
        }
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.dataUser) {
      return true;
    }
    return false;
  }

  onGetInforUser = (token) => {
    const { GetInforUser } = this.props;
    const bearerToken = { 'Authorization': `Bearer ${token}` };
    const headerRequest = { ...defaultHeader, ...bearerToken };
    GetInforUser(headerRequest);
  }

    onLoading = () => {
      this.setState({
        isLoading: true,
      });
    }

    onSignInUsingGoogle = async () => {
      const { isError } = this.state;
      const { Login } = this.props;
      await this.onLoading();
      await firebase.auth().signInWithPopup(provider).catch((error) => {
        const errorMessage = error.message;
        this.setState({
          isError: true,
          errorMessage,
          isLoading: false,
        });
      });
      if (isError === false) {
        const user = firebase.auth().currentUser;
        const account = { username: user.displayName, email: user.email };
        await Login(account);
        this.setState({
          // isLogin: true,
          isLoading: false,
        });
      }
    }

    // onLogin = async (account) => {
    //   const { Login } = this.props;
    //   await this.onLoading();
    //   await firebaseApp.auth().signInWithEmailAndPassword(account.username, account.password)
    //     .catch((error) => {
    //       // Handle Errors here.
    //       let errorMessage = error.message;
    //       const errorCode = error.code;
    //       switch (errorCode) {
    //         case typeErrors.USER_DISABLE:
    //           errorMessage = errorMessages.USER_DISABLE;
    //           break;
    //         case typeErrors.USER_NOT_FOUND:
    //           errorMessage = errorMessages.USER_NOT_FOUND;
    //           break;
    //         case typeErrors.NETWORK_REQUEST_FAILED:
    //           errorMessage = errorMessages.NETWORK_REQUEST_FAILED;
    //           break;
    //         case typeErrors.WRONG_PASSWORD:
    //           errorMessage = errorMessages.WRONG_PASSWORD;
    //           break;
    //         case typeErrors.INVALID_EMAIL:
    //           errorMessage = errorMessages.INVALID_EMAIL;
    //           break;
    //         default:
    //           break;
    //       }
    //       this.setState({
    //         isError: true,
    //         errorMessage,
    //         isLoading: false,
    //       });
    //     });
    //   const { isError } = this.state;
    //   if (isError === false) {
    //     const user = firebase.auth().currentUser;
    //     const account = { username: user.displayName, email: user.email };
    //     await Login(account);
    //     this.setState({
    //       isLoading: false,
    //     });
    //   }
    // }
    onLogin = async (account) => {
      const { Login } = this.props;
      await this.onLoading();
      await Login(account);
    }

    onClose = () => {
      this.setState({
        isError: false,
        isLoading: false,
        errorMessage: '',
      });
    }

    render() {
      const user = JSON.parse(localStorage.getItem('USER'));
      // const user = 1;
      const { isLoading, isError, errorMessage } = this.state;
      if (user !== null) {
        return <Redirect to="/" />;
      }
      return (
        <React.Fragment>
          {isLoading ? (
            <LoadingScreen />
          )
            : <React.Fragment>
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
            </React.Fragment> }

        </React.Fragment>
      );
    }
}
const mapStateToProps = (state) => ({
  dataLogin: state.Login,
  dataUser: state.InforUser,
});
const mapDispatchToProps = (dispatch) => ({
  Login: (account) => {
    dispatch(actions.signInRequest(account));
  },
  GetInforUser: (token) => {
    dispatch(actions.getInforRequest(token));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
