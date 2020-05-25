import callAPI from '../utils/APICaller';
import * as types from '../constants/ActionTypes';

let initialState = {};





const editproduct = (state = initialState, action) => {
    switch (action.type) {

        case types.GET_INFOR_EDIT_PRODUCT:
            state=action.product;

            return state;
        default:
            return state;
    }
}
export default editproduct;