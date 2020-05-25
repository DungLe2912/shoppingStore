import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//var Modal = require('react-bootstrap-modal');
class Notification extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal: false,
        }
    }
    componentWillReceiveProps(nextProps) {

        if (nextProps && nextProps.openModal) {
            //  console.log("componentWillReceiveProps");
            this.setState({
                showModal: nextProps.openModal,
            })
        }
    }
    

    close = () => {
        console.log("runClose");
        this.setState({ showModal: false }
        );
    }
    
    // open = () => {
    //     console.log("runOpen");
    //     this.setState({ showModal: true });
    // }
    render() {
        const { productsTotal } = this.props;
      //  console.log(productsTotal.length);
        return (
            <div>



                <Modal dialogClassName='custom-dialog' animation={false} show={this.state.showModal} onHide={this.close}>
                    <Modal.Header>
                        <Modal.Title>Thông báo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h3 style={{ textAlign: "center" }}>{productsTotal.length > 0 ? 'Thanh toán thành công' : 'Không có sản phẩm nào'}</h3>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                        <Link to={'/product-list'} className="btn btn-success"><span className="fa fa-shopping-cart"></span>&nbsp;Tiếp tục mua sắm</Link>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Notification;