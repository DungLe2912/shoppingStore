/* eslint-disable react/jsx-filename-extension */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-deprecated */
import React, { Component } from 'react';
import { connect } from 'react-redux';

class ModalItems extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      product: {},
      quantity: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.productOnModal) {
      this.setState({
        product: nextProps.productOnModal,
        quantity: 0,
      });
    }
  }

    onChangeQuantity=(data) => {
      this.props.onChangeQuantity(data);
    }

    increaseQuantity() {
      if (this.state.quantity < this.props.productOnModal.quantity) {
        this.setState({
          quantity: this.state.quantity + 1,
        }, () => this.onChangeQuantity(this.state.quantity));
      }
    }

    descreaseQuantity = () => {
      if (this.state.quantity > 0) {
        this.setState({
          quantity: this.state.quantity - 1,
        }, () => this.onChangeQuantity(this.state.quantity));
      }
    }

    render() {
      const product = this.props.productOnModal;
      const { quantity } = this.state;
      return (
        <tr>
          <td>{product.id}</td>
          <td>{product.name}</td>
          <td>{product.price}</td>
          <td className="modal-flex">
            <button type="button" className="btn btn-warning fa fa-minus" onClick={() => this.descreaseQuantity()} />
              &nbsp;
            {this.state.quantity}
              &nbsp;
            <button type="button" className="btn btn-primary fa fa-plus" onClick={() => this.increaseQuantity()} />
          </td>
          <td>
            {this.showTotal(product.price, quantity)}
            {' '}
            $
          </td>
        </tr>
      );
    }

    showTotal = (price, quantity) => price * quantity
}
const mapStateToProps = (state) => ({
  productOnModal: state.Modal,
  quantity: state.quantityModalProduct,
});
const mapDispatchToProps = () => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(ModalItems);
