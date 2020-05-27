/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Route , Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
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
            isUpdated:false,
        }
    }
    componentWillMount(){
        this.setState({
            isUpdated:this.props.isUpdated,
        })
    }
   componentWillReceiveProps(nextProps){
       
       if(nextProps){
           this.setState({
               isUpdated:nextProps.isUpdated,
           })
       }
   }
   onLogout=()=>{
       this.props.onLogout();
   }
    render() {
        return (
            <div className="navbar navbar-default">
                <a className = "navbar-brand">STORE</a>
                <ul className="nav navbar-nav">
                   {this.showMenu(menus)}
                   
                </ul>
                
            </div>
            
        );
    }
    showMenu=(menus)=>{
        let result =null;   
        if(menus.length >0){
            result = menus.map((menu,index)=>{
                return (
                    <MenuLink
                    key={index}
                    label={(this.state.isUpdated===true&&menu.name==='Đăng nhập')?'Đăng xuất':menu.name}
                    to={(this.state.isUpdated===true&&menu.name==='Đăng nhập')?'/logout':menu.to}
                    activeOnlyWhenExact={menu.exact}
                    
                    ></MenuLink>
                );
            });
        }
        return result;
    }
}
const mapStateToProps = (state) => {
    return {
        isUpdated:state.UpdateMenu,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onLogout:()=>{
            dispatch(actions.Logout())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu);