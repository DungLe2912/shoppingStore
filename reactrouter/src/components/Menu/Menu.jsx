/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-deprecated */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

const menus = [
  {
    name: 'Trang chủ',
    to: '/',
    exact: true,
  },
  {
    name: 'Quản Lý Sản Phẩm',
    to: '/product-list',
    exact: false,
  },
  {
    name: 'Giỏ hàng',
    to: '/product-cart',
    exact: false,
  },
  {
    name: 'Đăng nhập',
    to: '/login',
    exact: false,
  },
];
const MenuLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match }) => {
      const active = match ? 'active' : '';
      return (
        <li className={active}>
          <Link to={to}>
            {label}
          </Link>
        </li>
      );
    }}
  />
);

class Menu extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isUpdated: false,
    };
  }

  componentWillMount() {
    const { isUpdated } = this.props;
    this.setState({
      isUpdated,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({
        isUpdated: nextProps.isUpdated,
      });
    }
  }

   onLogout= () => {
     const { onLogout } = this.props;
     onLogout();
   }

   render() {
     return (
       <div className="navbar navbar-default">
         <a className="navbar-brand">STORE</a>
         <ul className="nav navbar-nav">
           {this.showMenu(menus)}
         </ul>
       </div>
     );
   }

    showMenu = (menus) => {
      let result = null;
      const user = JSON.parse(localStorage.getItem('USER'));
      const { isUpdated } = this.state;
      if (menus.length > 0) {
        result = menus.map((menu, index) => (
          <MenuLink
            key={index}
            label={(isUpdated === true && menu.name === 'Đăng nhập' && user !== null) ? `Xin chào ${user.username} (Đăng xuất)` : menu.name}
            to={(isUpdated === true && menu.name === 'Đăng nhập') ? '/logout' : menu.to}
            activeOnlyWhenExact={menu.exact}
          />
        ));
      }
      return result;
    }
}
const mapStateToProps = (state) => ({
  isUpdated: state.UpdateMenu,
});
const mapDispatchToProps = (dispatch) => ({
  onLogout: () => {
    dispatch(actions.Logout());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
