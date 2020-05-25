import React, { Component } from 'react';
import Login from '../../components/Login/Login';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from '../../actions/index';
class LoginPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            isOpen:false,
        }
    }
    
    componentDidMount(){
        this.props.fetchAuthRequest();
    }
    onLogin=(account)=>{
        this.props.login(account);
        let user = JSON.parse(localStorage.getItem('USER'));
      if(user===null){
          this.setState({
              isOpen:true,
          })
      }
    }
    render() {
        let user = JSON.parse(localStorage.getItem('USER'));
        if(user!==null){
            console.log("redirect");
            return <Redirect to="/"/>
        }
        return (
            <div>
                <Login
                 onLogin={this.onLogin}
                 isOpen={this.state.isOpen}
                />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
       accounts:state.Login,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
       fetchAuthRequest:()=>{
           dispatch(actions.fetchAuthRequest());
       },
       login:(account)=>{
           dispatch(actions.Login(account));
       }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
