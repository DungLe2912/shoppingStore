import * as types from '../constants/ActionTypes';

const findIndex = (username,password, accounts) => {
    let result = -1;
    accounts.forEach((account, index) => {
      //  console.log(username,password);
        if (account.username === username && account.password===password) {
            result = index;
        }
    });
    return result;
}
let initialState = [];

const Login = (state = initialState, action) => {
    let index=-1;
    switch (action.type) {
        case types.FETCH_AUTH:
            state = action.accounts;
           
            return state;
        case types.LOGIN:
           // console.log(state);
            index=findIndex(action.account.username,action.account.password,state);
         //   console.log(index);
            if(index!==-1){
                localStorage.setItem('USER', JSON.stringify(action.account));
            }
            return [...state];
        default:
            return state;
    }
}
export default Login;