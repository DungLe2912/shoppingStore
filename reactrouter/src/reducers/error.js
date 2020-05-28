import * as types from '../constants/ActionTypes';
let initialState = "";





const Error = (state = initialState, action) => {
    switch (action.type) {

        case types.HANDLE_ERROR:
           
            state = "Lỗi kết nối tới server";
            return state;
        default:
            return state;
    }
}
export default Error;