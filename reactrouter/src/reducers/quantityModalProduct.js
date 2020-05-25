import * as types from '../constants/ActionTypes';

let initialState = 0;





const quantityModalProduct = (state = initialState, action) => {
    switch (action.type) {


        case types.CHANGE_QUANTITY:
            
            state=action.quantity;
            return state;
       
        default:
            return state;
    }
}
export default quantityModalProduct;