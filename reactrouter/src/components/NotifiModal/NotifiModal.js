/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NotifiModal extends Component {
    close = () => {
      const { onClose } = this.props;
      onClose();
    }

    render() {
      const { errorMessage, isOpen } = this.props;
      return (
        <div>
          <Modal dialogClassName="custom-dialog" animation={false} show={isOpen} onHide={this.close}>
            <Modal.Header>
              <Modal.Title>Thông báo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h3 style={{ textAlign: 'center' }}>{errorMessage}</h3>
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn btn-primary" onClick={() => this.close()}>
                <span className="fa fa-sign-in" />
                    &nbsp;Quay lại
                {' '}
              </Button>
              <Link to="/" className="btn btn-success">
                <span className="fa fa-home" />
                    &nbsp;Tới trang chủ
              </Link>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
}

export default NotifiModal;
