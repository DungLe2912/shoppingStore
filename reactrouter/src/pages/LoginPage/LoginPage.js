/* eslint-disable react/jsx-filename-extension */
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
import { toast } from 'react-toastify';
import Login from '../../components/Login/Login';
import * as actions from '../../actions/auth';
import 'firebase/auth';
import firebaseConfig from '../../firebase';
import LoadingScreen from '../../components/Loading/LoadingScreen';
import NotifiModal from '../../components/NotifiModal/NotifiModal';
import { defaultHeader } from '../../constants/Config';
import errorCode from '../../constants/errCode';
import * as errMessage from '../../constants/ErrorMessageHandle';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
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

  componentWillMount() {
    const { dataVerify } = this.props;
    if (dataVerify !== null) {
      if (dataVerify.data.success === true) {
        this.notify();
      }
    }
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

  notify =() => {
    toast.success('Xác thực thành công');
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
  dataVerify: state.Verify,
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
