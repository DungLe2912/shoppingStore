import * as types from '../constants/ActionTypes';

const data = JSON.parse(localStorage.getItem('CART'));
const initialState = data || [];

const findIndex = (id, products) => {
  let result = -1;
  products.forEach((product, index) => {
    if (product.id === id) {
      result = index;
    }
  });
  return result;
};

const CartProduct = (state = initialState, action) => {
  let index = -1;
  switch (action.type) {
    case types.ADD_TO_CART:
      // console.log(action.product,action.quantity)
      index = findIndex(action.product.id, state);
      //  console.log(index);
      if (index === -1) {
        state.push(action.product);
      } else if (state[index].quantity + action.product.quantity < action.quantity) {
        // eslint-disable-next-line no-param-reassign
        state[index] = {
          ...state[index],
          quantity: state[index].quantity + action.product.quantity,
        };
      } else {
        // eslint-disable-next-line no-param-reassign
        state[index] = {
          ...state[index],
          quantity: action.quantity,
        };
      }
      localStorage.setItem('CART', JSON.stringify(state));
      //  console.log(state);
      return [...state];
    case types.UPDATE_QUANTITY_PRODUCT_ON_CART:
      index = findIndex(action.product.id, state);
      if (index !== -1) {
        // eslint-disable-next-line no-param-reassign
        state[index] = {
          ...state[index],
          quantity: action.number,
        };
      }
      //   console.log(state);
      localStorage.setItem('CART', JSON.stringify(state));
      return [...state];
    case types.PAY_CART:
      // eslint-disable-next-line no-param-reassign
      state = [];
      localStorage.setItem('CART', JSON.stringify(state));
      return [...state];
    case types.FETCH_PRODUCT_CART:
      return [...state];
    case types.DELETE_PRODUCT_ON_CART:
      index = findIndex(action.product.id, state);
      if (index !== -1) {
        state.splice(index, 1);
        localStorage.setItem('CART', JSON.stringify(state));
      }
      // eslint-disable-next-line no-fallthrough
    default:
      return [...state];
  }
};
export default CartProduct;
