import React, { Component } from 'react';
import Logout from '../../components/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
class LogoutPage extends Component {
    onLogout=()=>{
        this.props.Logout();
       //console.log('onLogout')
    }
    render() {
        return (
           <React.Fragment>
                <Logout 
                onLogout={this.onLogout}
                isLogin={this.props.isLogin}
                history={ this.props.history }
                />
           </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => {
    return {
      isLogin:state.UpdateMenu,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        Logout:()=>{
            dispatch(actions.Logout());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);