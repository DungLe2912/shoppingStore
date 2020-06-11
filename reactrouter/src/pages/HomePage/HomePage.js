/* eslint-disable react/prop-types */
/* eslint-disable react/no-deprecated */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
class HomePage extends Component {

  componentWillMount() {
    const { dataLogin } = this.props;
    if (dataLogin !== null) {
      if (dataLogin.data.success === true) {
        this.notify();
      }
    }
  }

  notify =() => {
    toast.success('Đăng nhập thành công');
  }

  render() {
    return (
      <div className="container">
        <h1>Trang chủ</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.Login,
});
const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);