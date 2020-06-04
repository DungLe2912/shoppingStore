/* eslint-disable react/prop-types */
/* eslint-disable react/no-deprecated */
import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// var Modal = require('react-bootstrap-modal');
class Logout extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showModal: false,
    };
  }

  componentWillMount() {
    const { isLogin } = this.props;
    this.setState({
      showModal: isLogin,
    });
  }

    close = () => {
      const { history } = this.props;
      history.goBack();
    }

   onLogout=() => {
     const { onLogout } = this.props;
     onLogout();
   }

   render() {
     const { showModal } = this.state;
     return (
       <div>


         <Modal dialogClassName="custom-dialog" animation={false} show={showModal} onHide={this.close}>
           <Modal.Header>
             <Modal.Title>Thông báo</Modal.Title>
           </Modal.Header>
           <Modal.Body>
             <h3 style={{ textAlign: 'center' }}>Bạn muốn đăng xuất?</h3>
           </Modal.Body>
           <Modal.Footer>
             <Button className="btn btn-primary" onClick={this.close}>
               <span className="fa fa-sign-in" />
&nbsp;Quay lại
             </Button>
             <Link to="/login" className="btn btn-success" onClick={() => this.onLogout()}>
               <span className="fa fa-home" />
&nbsp;Đăng xuất
             </Link>
           </Modal.Footer>
         </Modal>
       </div>
     );
   }
}

export default Logout;
