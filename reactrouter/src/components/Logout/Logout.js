import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//var Modal = require('react-bootstrap-modal');
class Logout extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal: false,
        }
    }
    componentWillMount(){
        this.setState({
            showModal:this.props.isLogin,
        })
    }
    // componentWillReceiveProps(nextProps) {

    //     if (nextProps) {
    //        //   console.log("componentWillReceiveProps");
    //         this.setState({
    //             showModal: nextProps.isLogin,
    //         })
    //     }
    // }


    close = () => {
        
        // this.setState({ showModal: false }
        // );
        const { history } = this.props;
        history.goBack();
    }

   onLogout=()=>{
       this.props.onLogout();
   }
    render() {
          
        //  console.log(productsTotal.length);
        return (
            <div>



                <Modal dialogClassName='custom-dialog' animation={false} show={this.state.showModal} onHide={this.close}>
                    <Modal.Header>
                        <Modal.Title>Thông báo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h3 style={{ textAlign: "center" }}>Bạn muốn đăng xuất?</h3>
                    </Modal.Body>
                    <Modal.Footer>
                         <Button className="btn btn-primary" onClick={this.close}><span className="fa fa-sign-in"></span>&nbsp;Quay lại </Button>
                        <Link to={'/login'} className="btn btn-success"onClick={()=>this.onLogout()}><span className="fa fa-home"></span>&nbsp;Đăng xuất</Link>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Logout;