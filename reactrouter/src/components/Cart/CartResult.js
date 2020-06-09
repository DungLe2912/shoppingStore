/* eslint-disable react/jsx-filename-extension */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';

class CartResult extends Component {
  render() {
    const { productsTotal } = this.props;
    // console.log(productsTotal);
    return (
      <div className="input-group lable-flex">
        <h3>
          Tổng tiền:
          {this.showTotal(productsTotal)}
        </h3>

      </div>
    );
  }

    showTotal=(products) => {
      let result = 0;
      products.map((product) => {
        result += (product.price * product.quantity);
      });
      return result;
    }
}

export default CartResult;
