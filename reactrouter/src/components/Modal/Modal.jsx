/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalItems from './ModalItems';
import * as actions from '../../actions/index';

class Modal extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      quantityModal: 0,
    };
  }

    onAddToCart= () => {
      const { changeQuantity, addProductToCart, updateQuantityProduct } = this.props;
      const { quantityModal } = this.state;
      changeQuantity(quantityModal);
      let { productModal } = this.props;
      const quantityTmp = productModal;
      productModal = {
        ...productModal,
        quantity: quantityModal,
      };
      addProductToCart(productModal, quantityTmp.quantity);
      updateQuantityProduct(quantityModal, quantityTmp);
    }

    onChangeQuantity = (data) => {
      this.setState({
        quantityModal: data,
      });
    }

    render() {
      return (
        <div className="modal fade" id="modal-id">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 className="modal-title">Thông tin sản phẩm</h4>
              </div>
              <div className="modal-body">
                <div className="panel-body">

                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Mã</th>
                        <th>Tên</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Tổng tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      <ModalItems onChangeQuantity={this.onChangeQuantity} />
                    </tbody>
                  </table>

                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Đóng</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.onAddToCart()}>Thêm vào giỏ hàng</button>
              </div>
            </div>
          </div>
        </div>

      );
    }
}

const mapStateToProps = (state) => ({
  quantityModalProduct: state.quantityModalProduct,
  productModal: state.Modal,
});
const mapDispatchToProps = (dispatch) => ({
  changeQuantity: (quantity) => {
    dispatch(actions.changeQuantity(quantity));
  },
  addProductToCart: (product, quantity) => {
    dispatch(actions.addProductToCart(product, quantity));
  },
  updateQuantityProduct: (number, product) => {
    dispatch(actions.updateQuantityProductRequest(number, product));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Modal);
