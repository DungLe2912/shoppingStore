/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../actions/auth';
import LoadingScreen from '../../components/Loading/LoadingScreen';
import Verify from '../../components/Verify/Verify';
import NotifiModal from '../../components/NotifiModal/NotifiModal';
import * as errMessage from '../../constants/ErrorMessageHandle';

class VerifyPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: false,
      isError: false,
      errorMessage: '',
    };
  }

  onLoading = () => {
    this.setState({
      isLoading: true,
    });
    // console.log('loading');
  }

  onClose = () => {
    this.setState({
      isError: false,
      isLoading: false,
      errorMessage: '',
    });
  }

  onVerify = async (code) => {
    const { dataSignUp } = this.props;
    await this.onLoading();
    if (code !== dataSignUp.data.username) {
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

  render() {
    const { isLoading, isError, errorMessage } = this.state;
    const { history, dataSignUp } = this.props;
    if (!dataSignUp) {
      history.goBack();
    }
    return (
      <>
        {isLoading ? (
          <LoadingScreen />
        )
          : (
            <>
              <Verify />
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
  
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyPage);
