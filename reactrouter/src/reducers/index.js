import { combineReducers } from 'redux';
import products from './products';
import editProduct from './editProduct';
import Modal from './Modal';
import quantityModalProduct from './quantityModalProduct';
import CartProduct from './cartProducts';
import Login from './login';
import UpdateMenu from './updateMenu';
import Error from './error';
import InforUser from './inforUser';
import SignUp from './signup';
import Verify from './verify';

const appReducer = combineReducers({
  products,
  editProduct,
  Modal,
  quantityModalProduct,
  CartProduct,
  Login,
  UpdateMenu,
  Error,
  InforUser,
  SignUp,
  Verify,
});

export default appReducer;
