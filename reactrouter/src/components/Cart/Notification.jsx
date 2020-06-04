/* eslint-disable react/prop-types */
/* eslint-disable react/no-deprecated */
import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// var Modal = require('react-bootstrap-modal');
class Notification extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showModal: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.openModal) {
      this.setState({
        showModal: nextProps.openModal,
      });
    }
  }


    close = () => {
      this.setState({ showModal: false });
    }

    render() {
      const { productsTotal } = this.props;
      const { showModal } = this.state;
      return (
        <div>


          <Modal dialogClassName="custom-dialog" animation={false} show={showModal} onHide={this.close}>
            <Modal.Header>
              <Modal.Title>Thông báo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h3 style={{ textAlign: 'center' }}>{productsTotal.length > 0 ? 'Thanh toán thành công' : 'Không có sản phẩm nào'}</h3>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close}>Close</Button>
              <Link to="/product-list" className="btn btn-success">
                <span className="fa fa-shopping-cart" />
&nbsp;Tiếp tục mua sắm
              </Link>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
}

export default Notification;
