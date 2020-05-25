import * as types from '../constants/ActionTypes';
var data = JSON.parse(localStorage.getItem('USER'));
let initialState = data ? true:false;





const UpdateMenu = (state = initialState, action) => {
    switch (action.type) {

        case types.LOGIN:
           
            state = true;
            // state = {
            //     ...state,
            //     quantity:0
            // }
            return state;
       case types.LOGOUT:
           state = false;
           console.log(state);
           return state;
        default:
            return state;
    }
}
export default UpdateMenu;