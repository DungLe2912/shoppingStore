import React, { Component } from 'react';
import products from '../../reducers/products';
import * as actions from '../../actions/index';
import { connect } from 'react-redux';

class ModalItems extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            product: {},
            quantity: 0,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.productOnModal) {
            this.setState({
                product: nextProps.productOnModal,
                quantity: 0
            })
        }
    }
    onChangeQuantity=(data)=>{
        this.props.onChangeQuantity(data);
    }
  
    increaseQuantity() {
        if (this.state.quantity < this.props.productOnModal.quantity) {
          //  console.log("increase");
           // const { quantity } = ;
            this.setState({
                quantity: this.state.quantity + 1,
            },()=>this.onChangeQuantity(this.state.quantity))
        }
    }

    descreaseQuantity = () => {
        //console.log("decrease");
        if (this.state.quantity > 0) {
            this.setState({
                quantity: this.state.quantity - 1,
            },()=>this.onChangeQuantity(this.state.quantity))
            
        }
    }

    render() {
        const product = this.props.productOnModal;
        // console.log(this.props.productOnModal);
        const { quantity } = this.state;
        return (
            <tr>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td className="modal-flex">
                    <button type="button" className="btn btn-warning fa fa-minus" onClick={() => this.descreaseQuantity()}></button>&nbsp;
                        {this.state.quantity}&nbsp;
                    <button type="button" className="btn btn-primary fa fa-plus" onClick={() => this.increaseQuantity()} ></button>
                </td>
                <td>{this.showTotal(product.price, this.state.quantity)} $</td>
            </tr>
        );

    }
    showTotal = (price, quantity) => {
        return price * quantity;
    }
}
const mapStateToProps = (state) => {
    return {
        productOnModal: state.Modal,
        quantity: state.quantityModalProduct,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
       
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalItems);