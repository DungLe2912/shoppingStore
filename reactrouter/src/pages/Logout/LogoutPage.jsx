/* eslint-disable react/jsx-fragments */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Logout from '../../components/Logout/Logout';
import * as actions from '../../actions/products';

class LogoutPage extends Component {
    onLogout= () => {
      const { Logout } = this.props;
      Logout();
    }

    render() {
      const { isLogin, history } = this.props;
      return (
        <React.Fragment>
          <Logout
            onLogout={this.onLogout}
            isLogin={isLogin}
            history={history}
          />
        </React.Fragment>
      );
    }
}
const mapStateToProps = (state) => ({
  isLogin: state.UpdateMenu,
});
const mapDispatchToProps = (dispatch) => ({
  Logout: () => {
    dispatch(actions.Logout());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);
