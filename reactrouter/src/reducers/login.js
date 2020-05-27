import * as types from '../constants/ActionTypes';


let initialState = [];

const Login = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_AUTH:
            state = action.accounts;
           
            return state;
        case types.LOGIN:
           // console.log(state);
         //   console.log(index);
         localStorage.setItem('USER', JSON.stringify(action.account));
            return [...state];
        case types.LOGOUT:
            localStorage.removeItem('USER');
            console.log('deleteitem');
            return [...state];
        default:
            return state;
    }
}
export default Login;