import * as types from '../constants/ActionTypes';

let initialState = {};





const Modal = (state = initialState, action) => {
    switch (action.type) {

        case types.OPEN_MODAL:
           
            state = action.product;
            // state = {
            //     ...state,
            //     quantity:0
            // }
            return state;
       
        default:
            return state;
    }
}
export default Modal;