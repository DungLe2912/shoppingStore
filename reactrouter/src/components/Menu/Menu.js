import React, { Component } from 'react';
import { Route , Link } from 'react-router-dom';
import SigIn from '../SignIn/SignIn';
const menus=[
    {
        name:'Trang chủ',
        to: '/',
        exact: true
    },
    {
        name:'Quản Lý Sản Phẩm',
        to: '/product-list',
        exact: false
    },
    {
        name:'Giỏ hàng',
        to: '/product-cart',
        exact: false
    },
    {
        name:'Đăng nhập',
        to: '/login',
        exact: false
    }
];
const MenuLink= ({label,to,activeOnlyWhenExact})=>{
    return (
        <Route
        path={to}
        exact={activeOnlyWhenExact}
        children={({match})=>{
            const active = match ? 'active' :'';
            return (
                <li className ={active}>
                    <Link to ={to}>
                    {label}
                    </Link>
                </li>
            );
        }}
        />
    );
};

class Menu extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            isUpdate:false,
        }
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
    showMenu=(menus)=>{
        let user = JSON.parse(localStorage.getItem('USER'));
        let result =null;   
        if(menus.length >0){
            result = menus.map((menu,index)=>{
                return (
                    <MenuLink
                    key={index}
                    label={(user!==null&&menu.name==='Đăng nhập')?'Đăng xuất':menu.name}
                    to={menu.to}
                    activeOnlyWhenExact={menu.exact}
                    ></MenuLink>
                );
            });
        }
        return result;
    }
}

export default Menu;