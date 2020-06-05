import * as types from '../constants/ActionTypes';
import callAPI from '../utils/APICaller';

export const handleErrorFetchProduct = (error) => ({
  type: types.HANDLE_ERROR,
  error,
});
export const openModal = (product) => ({
  type: types.OPEN_MODAL,
  product,
});
export const editProduct = (product) => ({
  type: types.EDIT_PRODUCT,
  product,
});

export const editProductRequest = (id, product) => (dispatch) => callAPI(`products/${id}`, 'PUT', {
  name: product.txtName,
  price: product.txtPrice,
  status: product.chkbStatus,
  quantity: product.txtQuantity,
}).then((res) => {
  // console.log(res.data);
  dispatch(editProduct(res.data));
}).catch((error) => {
  dispatch(handleErrorFetchProduct(error));
});

export const saveChangeEditProduct = (product) => ({
  type: types.GET_INFOR_EDIT_PRODUCT,
  product,
});
export const getInforEditProduct = (product) => ({
  type: types.GET_INFOR_EDIT_PRODUCT,
  product,
});
export const getInforEditProductRequest = (id) => (dispatch) => callAPI(`products/${id}`, 'GET', null).then((res) => {
  //  console.log(res.data);
  dispatch(getInforEditProduct(res.data));
}).catch((error) => {
  dispatch(handleErrorFetchProduct(error));
});
export const addProduct = (product) => ({
  type: types.ADD_PRODUCT,
  product,
});
export const addProductRequest = (product) => (dispatch) => callAPI('products', 'POST', {
  name: product.txtName,
  price: product.txtPrice,
  status: product.chkbStatus,
  quantity: product.txtQuantity,
}).then((res) => {
  //  console.log(res.data);
  dispatch(addProduct(res.data));
}).catch((error) => {
  dispatch(handleErrorFetchProduct(error));
});
export const deleteProduct = (id) => ({
  type: types.DELETE_PRODUCT,
  id,
});
export const deleteProductRequest = (id) => (dispatch) => callAPI(`products/${id}`, 'DELETE', null).then(() => {
  dispatch(deleteProduct(id));
}).catch((error) => {
  dispatch(handleErrorFetchProduct(error));
});

export const fetchProduct = (products) => ({
  type: types.FETCH_PRODUCTS,
  products,
});
export const fetchProductRequest = () => (dispatch) => callAPI('products', 'GET', null).then((res) => {
  // console.log(res.data);
  dispatch(fetchProduct(res.data));
}).catch((error) => {
  dispatch(handleErrorFetchProduct(error));
});


export const changeQuantity = (quantity) => ({
  type: types.CHANGE_QUANTITY,
  quantity,
});

export const addProductToCart = (product, quantity) => ({
  type: types.ADD_TO_CART,
  product,
  quantity,
});
export const fetchProductOnCart = () => ({
  type: types.FETCH_PRODUCT_CART,
});
export const updateQuantityProduct = (number, product) => ({
  type: types.UPDATE_QUANTITY_PRODUCT,
  number,
  product,
});
export const updateQuantityProductRequest = (number, product) => (dispatch) => callAPI(`products/${product.id}`, 'PUT', {
  name: product.name,
  price: product.price,
  status: product.status,
  quantity: product.quantity - number,
}).then(() => {
  //  console.log(res.data);
  dispatch(updateQuantityProduct(number, product));
}).catch((error) => {
  dispatch(handleErrorFetchProduct(error));
});

export const updateQuantityProductOnCart = (number, product) => ({
  type: types.UPDATE_QUANTITY_PRODUCT_ON_CART,
  number,
  product,
});
export const payCart = () => ({
  type: types.PAY_CART,
});
export const deleteProductOnCard = (product) => ({
  type: types.DELETE_PRODUCT_ON_CART,
  product,
});
export const changeStatus = (product) => ({
  type: types.CHANGE_STATUS,
  product,
});
export const changeStatusRequest = (product) => (dispatch) => callAPI(`products/${product.id}`, 'PUT', {
  name: product.name,
  price: product.price,
  status: !product.status,
  quantity: product.quantity,
}).then(() => {
  //  console.log(res.data);
  dispatch(changeStatus(product));
}).catch((error) => {
  dispatch(handleErrorFetchProduct(error));
});


export const Logout = () => ({
  type: types.LOGOUT,
});
