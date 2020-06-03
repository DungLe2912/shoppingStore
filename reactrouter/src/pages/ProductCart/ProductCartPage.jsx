/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Cart from '../../components/Cart/Cart';
import CartItems from '../../components/Cart/CartItems';
import * as actions from '../../actions/index';

class ProductCartPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      productsOnCart: [],
      productsOnCartPrev: [],
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { products, fetchProductRequest } = this.props;
    this.setState({
      productsOnCart: products,
    });
    fetchProductRequest();
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    // eslint-disable-next-line react/prop-types
    if (nextProps && nextProps.products) {
      this.setState({
        // eslint-disable-next-line react/prop-types
        productsOnCart: nextProps.products,
      });
    }
  }

   onDelete = (product) => {
     // eslint-disable-next-line react/prop-types
     const { deleteProductOnCard, updateQuantityProduct, productInStore } = this.props;
     deleteProductOnCard(product);
     updateQuantityProduct(-product.quantity, productInStore[
       this.findIndex(product.id, productInStore)]);
   }

    findIndex=(id, products) => {
      let result = -1;
      products.forEach((product, index) => {
        if (product.id === id) {
          result = index;
        }
      });
      return result;
    }

    onChangeQuantity=(number, product) => {
      // eslint-disable-next-line react/prop-types
      const { updateQuantityProductOnCart, updateQuantityProduct, productInStore } = this.props;
      updateQuantityProductOnCart(number, product);
      updateQuantityProduct(number - product.quantity, productInStore[
        this.findIndex(product.id, productInStore)]);
    }

    payOnCart=(data) => {
      const { productsOnCart } = this.state;
      // eslint-disable-next-line react/prop-types
      const { payCart } = this.props;
      if (data === true) {
        this.setState({
          productsOnCartPrev: productsOnCart,
        }, () => payCart());
      }
    }

    render() {
      // eslint-disable-next-line react/prop-types
      const { products } = this.props;
      const { productsOnCart, productsOnCartPrev } = this.state;
      const user = JSON.parse(localStorage.getItem('USER'));
      if (user === null) {
        return <Redirect to="login" />;
      }
      return (
        <>
          <Cart
            productsTotal={productsOnCart}
            productsOnCartPrev={productsOnCartPrev}
            onChangeQuantity={this.onChangeQuantity}
            payOnCart={this.payOnCart}
            onDelete={this.onDelete}
          >
            {this.showProductOnCart(products)}
          </Cart>
        </>
      );
    }

    showProductOnCart=(products) => {
      // eslint-disable-next-line react/prop-types
      const { productInStore } = this.props;
      let result = null;
      if (products.length > 0) {
        result = products.map((product, index) => (
          <CartItems
            onChangeQuantity={this.onChangeQuantity}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            product={product}
            index={index}
            productInStore={productInStore}
            onDelete={this.onDelete}
          />
        ));
      }
      return result;
    }
}

const mapStateToProps = (state) => ({
  products: state.CartProduct,
  quantity: state.quantityModalProduct,
  productModal: state.Modal,
  productInStore: state.products,
});
const mapDispatchToProps = (dispatch) => ({
  fetchProductRequest: () => {
    dispatch(actions.fetchProductRequest());
  },
  updateQuantityProductOnCart: (number, product) => {
    dispatch(actions.updateQuantityProductOnCart(number, product));
  },
  updateQuantityProduct: (number, product) => {
    dispatch(actions.updateQuantityProductRequest(number, product));
  },
  payCart: () => {
    dispatch(actions.payCart());
  },
  deleteProductOnCard: (product) => {
    dispatch(actions.deleteProductOnCard(product));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductCartPage);
