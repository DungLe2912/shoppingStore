/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/sort-comp */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { Component } from 'react';

class CartItems extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      quantity: 0,
      quantityPrev: 0,
    };
  }


  componentDidMount() {
    const { product } = this.props;
    const { quantity } = this.state;
    this.setState({
      quantity: product.quantity,
    }, () => this.setState({
      quantityPrev: quantity,
    }));
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
      const { onChangeQuantity } = this.props;
      onChangeQuantity(number, product);
    }

    onIncrease=() => {
      const { product, productInStore } = this.props;
      const id = this.findIndex(product.id, productInStore);
      if (id !== -1) {
        if (this.state.quantity < productInStore[id].quantity + this.state.quantityPrev) {
          this.setState({
            quantity: this.state.quantity + 1,
          }, () => this.onChangeQuantity(this.state.quantity, product));
        }
      }
    }

    onDecrease=() => {
      const { product } = this.props;
      if (this.state.quantity > 0) {
        this.setState({
          quantity: this.state.quantity - 1,
        }, () => this.onChangeQuantity(this.state.quantity, product));
      }
    }

    onDelete=(product) => {
      const { onDelete } = this.props;
        if(confirm('Bạn có chắc chắn muốn xóa?')){ //eslint-disable-line
        onDelete(product);
      }
    }

    render() {
      const { product } = this.props;
      const { quantity } = this.state;
      return (
        <tr>
          <td>{product.id}</td>
          <td>{product.name}</td>
          <td>{product.price}</td>
          <td>
            <button type="button" className="btn btn-success fa fa-caret-left mr-10" onClick={() => this.onDecrease()} />
            {quantity}
            <button type="button" className="btn btn-success fa fa-caret-right ml-10" onClick={() => this.onIncrease()} />
          </td>
          <td>{this.showTotal(product.price, quantity)}</td>
          <td><button type="button" className="btn btn-warning fa fa-remove " onClick={() => this.onDelete(product)} /></td>

        </tr>
      );
    }

    showTotal = (price, quantity) => price * quantity
}

export default CartItems;
