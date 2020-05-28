import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//var Modal = require('react-bootstrap-modal');
class NotifiModal extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal: false,
           
        }
    }
    // componentDidUpdate(){
    //     this.setState({
    //         isRendering:false,
    //     })
    //    // console.log('componentwillupdate run');
    // }
    componentWillReceiveProps(nextProps) {

        if (nextProps && nextProps.isOpen) {
              console.log("componentWillReceiveProps");
            this.setState({
                showModal: nextProps.isOpen,
               
            })
        }
    }


    close = () => {
        console.log("runClose");
        this.setState({ showModal: false }
        );
        this.props.onClose();
    }
    // shouldComponentUpdate(nextProps,nextState){
    //     // eslint-disable-next-line no-useless-concat
    //     console.log('errMessage: '+nextProps.errorMessage +' - '+'showModal: '+nextState.showModal +' - '+'re-renderOpen: '+nextState.isreRenderOpen+' - '+'re-renderClose: '+nextState.isreRenderClose)
    //     // if(nextProps.errorMessage===""||nextState.showModal===false){
    //     //     console.log('update failed');
    //     //     return false;
    //     // }
    //     if(nextProps.errorMessage!==""&&nextState.showModal===true&&nextState.isreRenderOpen===true)
    //     {
    //         console.log('re-render open');
    //         return true;
    //     }
    //     if(nextProps.errorMessage===""&&nextState.showModal===false&&nextState.isreRenderClose===true&&nextState.isreRenderOpen===false){
    //         console.log('re-render close');
    //         return true;
    //     }
       
       
       

    //     return false;
    // }
    
    // open = () => {
    //     console.log("runOpen");
    //     this.setState({ showModal: true });
    // }
    render() {
        const { errorMessage } = this.props;
        console.log(this.state.showModal);
        //  console.log(productsTotal.length);
        return (
            <div>



                <Modal dialogClassName='custom-dialog' animation={false} show={this.state.showModal} onHide={this.close}>
                    <Modal.Header>
                        <Modal.Title>Thông báo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h3 style={{ textAlign: "center" }}>{errorMessage}</h3>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn btn-primary" onClick={()=>this.close()}><span className="fa fa-sign-in"></span>&nbsp;Quay lại </Button>
                        <Link to={'/'} className="btn btn-success"><span className="fa fa-home"></span>&nbsp;Tới trang chủ</Link>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default NotifiModal;