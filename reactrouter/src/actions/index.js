import * as types from '../constants/ActionTypes';
import callAPI from '../utils/APICaller';

export const openModal=(product)=>{
    return {
        type:types.OPEN_MODAL,
        product:product
    }
}

export const editProductRequest=(id,product)=>{
    return dispatch=>{
        return  callAPI(`products/${id}`, 'PUT', {
            name: product.txtName,
            price: product.txtPrice,
            status: product.chkbStatus,
            quantity:product.txtQuantity
        }).then(res => {
           // console.log(res.data);
            dispatch(editProduct(res.data));
        })
    }
}
export const editProduct=(product)=>{
    return {
        type:types.EDIT_PRODUCT,
        product:product
    }
}
export const saveChangeEditProduct = (product) => {
    return {
        type: types.GET_INFOR_EDIT_PRODUCT,
        product: product
    }
}
export const getInforEditProductRequest = (id) => {
    return dispatch => {
        return callAPI(`products/${id}`, 'GET', null).then(res => {
          //  console.log(res.data);
          dispatch(getInforEditProduct(res.data));
        })
    }
}
export const getInforEditProduct = (product) => {
    return {
        type: types.GET_INFOR_EDIT_PRODUCT,
        product: product
    }
}
export const addProductRequest = (product) => {
    return dispatch => {
        return callAPI('products', 'POST', {
            name: product.txtName,
            price: product.txtPrice,
            status: product.chkbStatus,
            quantity:product.txtQuantity
        }).then(res => {
          //  console.log(res.data);
            dispatch(addProduct(res.data));
        })
    }
}
export const addProduct = (product) => {
    return {
        type: types.ADD_PRODUCT,
        product: product,
    }
}
export const deleteProductRequest = (id) => {
    return (dispatch) => {
        return callAPI(`products/${id}`, 'DELETE', null).then(res => {
            dispatch(deleteProduct(id));
        })
    }
}
export const deleteProduct = (id) => {
    return {
        type: types.DELETE_PRODUCT,
        id: id,
    }
}

export const fetchProductRequest = () => {
    return (dispatch) => {
        return callAPI('products', 'GET', null).then(res => {
           // console.log(res.data);
            dispatch(fetchProduct(res.data))
        });
    }
}
export const fetchProduct = (products) => {
    return {
        type: types.FETCH_PRODUCTS,
        products: products
    }
}
export const changeQuantity=(quantity)=>{
    return {
        type:types.CHANGE_QUANTITY,
        quantity:quantity
    }
}

export const addProductToCart=(product,quantity)=>{
    return {
        type:types.ADD_TO_CART,
        product:product,
        quantity
    }
}
export const fetchProductOnCart=()=>{
    return {
        type:types.FETCH_PRODUCT_CART,
    }
}
export const updateQuantityProductRequest=(number,product)=>{
    return dispatch=>{
        return  callAPI(`products/${product.id}`, 'PUT', {
            name: product.name,
            price: product.price,
            status: product.status,
            quantity:product.quantity-number
        }).then(res => {
          //  console.log(res.data);
            dispatch(updateQuantityProduct(number,product));
        })
    }
}
export const updateQuantityProduct=(number,product)=>{
    return {
        type:types.UPDATE_QUANTITY_PRODUCT,
        number,
        product
    }
}
export const updateQuantityProductOnCart = (number,product) =>{
    return {
        type: types.UPDATE_QUANTITY_PRODUCT_ON_CART,
        number,
        product,
    }
}
export const payCart = ()=>{
    return {
        type:types.PAY_CART,
    }
}
export const deleteProductOnCard=(product)=>{
    return {
        type:types.DELETE_PRODUCT_ON_CART,
        product
    }
}
export const changeStatusRequest=(product)=>{
    return dispatch=>{
        return  callAPI(`products/${product.id}`, 'PUT', {
            name: product.name,
            price: product.price,
            status: !product.status,
            quantity:product.quantity
        }).then(res => {
          //  console.log(res.data);
            dispatch(changeStatus(product));
        })
    }
}
export const changeStatus = (product) =>{
    return {
        type:types.CHANGE_STATUS,
        product
    }
}
export const fetchAuthRequest=()=>{
    return dispatch=>{
        return callAPI('users','GET',null).then(res=>{
            dispatch(fetchAuth(res.data));
        })
    }
}
export const fetchAuth = (accounts)=>{
    return {
        type:types.FETCH_AUTH,
        accounts
    }
}
export const Login = (account)=>{
    return {
        type:types.LOGIN,
        account
    }
}
export const Logout = ()=>{
    return {
        type:types.LOGOUT,
    }
}