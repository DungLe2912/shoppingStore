import { combineReducers } from 'redux';
import products from './products';
import editProduct from './editProduct';
import Modal from './Modal';
import quantityModalProduct from './quantityModalProduct';
import CartProduct from './cartProducts';
import Login from './login';
const appReducer = combineReducers ({
    products,
    editProduct,
    Modal,
    quantityModalProduct,
    CartProduct,
    Login,
});

export default appReducer;