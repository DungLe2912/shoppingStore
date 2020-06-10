/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-deprecated */
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
import errorCode from '../../constants/errCode';


class VerifyPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: false,
      isError: false,
      errorMessage: '',
      isVerify: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      if (nextProps.dataVerify.err === errorCode.ECONNREFUSED) {
        this.setState({
          isLoading: false,
          isError: true,
          errorMessage: errMessage.ECONNREFUSED,
        });
      } else if (nextProps.dataVerify.data.errCode === errorCode.VERIFY_FAILED) {
        this.setState({
          isError: true,
          errorMessage: nextProps.dataVerify.data.message,
          isLoading: false,
        });
      } else {
        this.setState({
          isVerify: true,
          isLoading: false,
        });
      }
    }
  }

  onLoading = () => {
    this.setState({
      isLoading: true,
    });
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
    const { VerifyRequest } = this.props;
    await this.onLoading();
    const data = {
      code,
      username: dataSignUp.data.accountData,
    };
    await VerifyRequest(data);
  }


  render() {
    const {
      isLoading, isError, errorMessage, isVerify,
    } = this.state;
    const { dataSignUp } = this.props;
    if (dataSignUp === null && isVerify === false) {
      return <Redirect to="/" />;
    }
    if (isVerify === true) {
      return <Redirect to="/login" />;
    }
    return (
      <>
        {isLoading ? (
          <LoadingScreen />
        )
          : (
            <>
              <Verify onVerify={this.onVerify} />
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
  dataVerify: state.Verify,
});
const mapDispatchToProps = (dispatch) => ({
  VerifyRequest: (data) => {
    dispatch(actions.VerifyRequest(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyPage);
