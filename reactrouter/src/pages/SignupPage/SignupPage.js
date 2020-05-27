import React, { Component } from 'react';
import SignUp from '../../components/SignUp/SignUp';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from '../../actions/index';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from '../../firebase';
let firebaseApp = firebase;
//const firebaseApp = firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
    firebaseApp = firebase.initializeApp(firebaseConfig);
 }
 var provider = new firebase.auth.GoogleAuthProvider();
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
// firebase.auth().languageCode = 'pt';
provider.setCustomParameters({
    'login_hint': 'user@example.com'
  });

class SignoutPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            isSignup:false,
            isError:false,
            errorMessage:"",
            isSignupGoogle:false,
        }
    }
    componentWillMount(){
        const {history} = this.props;
        let user = JSON.parse(localStorage.getItem('USER'));
        if(user!==null){
            history.goBack();
        }
    }
    onSignup=async(account)=>{
        if(account.password !== account.repassword){
            this.setState({
                isError:true,
                errorMessage:"Password and Re-Password are not same",
            })
        }
        else{
            await firebaseApp.auth().createUserWithEmailAndPassword(account.username, account.password).catch(error=> {
                var errorMessage = error.message;
                console.log( errorMessage);
                this.setState({
                    isError:true,
                    errorMessage:errorMessage,
                })
                
              });
            if(this.state.isError===false){
                this.setState({
                    isSignup:true,
                },()=>{
                    console.log(this.state.isSignup);
                })
            }
        }
       
    }
    onSignInUsingGoogle = async () => {
        console.log('sign in using gg');
        await firebase.auth().signInWithPopup(provider).catch(error=> {
             const errorMessage = error.message;
             this.setState({
                 isError: true,
                 errorMessage: errorMessage,
             }, () => console.log(this.state.isError))
           });
           if (this.state.isError === false) {
           
             let user = firebase.auth().currentUser;
             let account = { "username": user.displayName, "email": user.email };
             await this.props.Login(account);
             this.setState({
                 isSignupGoogle:true,
             });
         }
     }
     onClose=()=>{
         this.setState({
             isError:false,
         })
     }
    render() {
        if(this.state.isSignup===true){
            return (
                <Redirect to="/login"/>
            )
        }
        if(this.state.isSignupGoogle===true){
            
            return (
                <Redirect to ="/"/>
            )
        }
        return (
            <div>
                <SignUp onSignup={this.onSignup}
                 errorMessage={this.state.errorMessage}
                 isError={this.state.isError}
                 onSignInUsingGoogle={this.onSignInUsingGoogle}
                 onClose={this.onClose}
                 />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        Login: (account) => {
            dispatch(actions.Login(account));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignoutPage);