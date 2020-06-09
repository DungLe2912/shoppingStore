/* eslint-disable react/jsx-filename-extension */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/sort-comp */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductItem extends Component {
    onChangeStatus=(product) => {
      const { onChangeStatus } = this.props;
      onChangeStatus(product);
    }

    render() {
      const { product, index } = this.props;
      const statusName = product.status ? 'Còn hàng' : 'Hết hàng';
      const statusClassName = product.status ? 'warning' : 'default';
      return (
        <tr>
          <td>{index + 1}</td>
          <td>{product.id}</td>
          <td>{product.name}</td>
          <td>{product.price}</td>
          <td>{product.quantity}</td>
          <td>
            <span className={`label label-${statusClassName} hover`} onClick={() => this.onChangeStatus(product)}>{statusName}</span>
          </td>
          <td>
            <Link to={`/product/${product.id}/edit`} className="btn btn-success mr-10">
              <span className="fa fa-pencil " />
              Sửa
            </Link>

            <button type="button" className="btn btn-danger mr-10" onClick={() => this.onDelete(product.id)}>
              <span className="fa fa-remove mr-5" />
              Xóa
            </button>
            <button type="button" className="btn btn-warning " data-toggle="modal" href="#modal-id" onClick={() => this.openModal(product)}>
              <span className="fa fa-shopping-cart mr-5" />
              Mua
            </button>
          </td>
        </tr>
      );
    }

    onDelete=(id) => {
      const { onDelete } = this.props;
        if(confirm('Bạn có chắc chắn muốn xóa?')){ //eslint-disable-line
        onDelete(id);
      }
    }

    openModal=(product) => {
      const { openModal } = this.props;
      openModal(product);
    }
}

export default ProductItem;
