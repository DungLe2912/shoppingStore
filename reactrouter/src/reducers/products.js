import * as types from '../constants/ActionTypes';

let initialState = [];

const findIndex=(id,products)=>{
    let result=-1;
    products.forEach((product,index) => {

        if(product.id===id){
            result=index;
          //  console.log(product.id);
        }
    });
    return result;
}



const products = (state = initialState, action) => {
    let index=-1;
    switch (action.type) {

        case types.FETCH_PRODUCTS:

            state=action.products;
            return [...state];
        case types.DELETE_PRODUCT:
          //  console.log(action.product.id);
          index=findIndex(action.id,state);
           // console.log(id);
            if(index!==-1){
                state.splice(index,1);
            }
            return [...state];
        case types.ADD_PRODUCT:
            state.push(action.product);
            return [...state];
        case types.EDIT_PRODUCT:
             index=findIndex(action.id,state);
          //  console.log(action.product);
            if(index!==-1){
                state[index]=[...action.product];
            }
            return [...state];
        case types.UPDATE_QUANTITY_PRODUCT:
          //  console.log(state);
          index=findIndex(action.product.id,state);
        //    console.log(action.number);
            if(index!==-1){
                state[index]={
                    ...state[index],
                    quantity:state[index].quantity-action.number
                }
           //     console.log(state[ind].quantity);
            }
            return [...state];
        case types.CHANGE_STATUS:
            index = findIndex(action.product.id,state);
            if(index!==-1){
                state[index]={
                    ...state[index],
                    status:!state[index].status
                }
            }
            return [...state];
        default:
           // fetchProduct();
          //  console.log(state);
            return [...state];
    }
}
export default products;