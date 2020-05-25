import { combineReducers } from 'redux';
import products from './products';
import editProduct from './editProduct';
import Modal from './Modal';
import quantityModalProduct from './quantityModalProduct';
import CartProduct from './cartProducts';
import Login from './login';
import UpdateMenu from './updateMenu'
const appReducer = combineReducers ({
    products,
    editProduct,
    Modal,
    quantityModalProduct,
    CartProduct,
    Login,
    UpdateMenu,
});

export default appReducer;