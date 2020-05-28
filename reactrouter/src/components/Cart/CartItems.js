import React, { Component } from 'react';
import products from '../../reducers/products';

class CartItems extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            quantity:0,
            quantityPrev:0,
        }
    }
     findIndex=(id,products)=>{
        let result=-1;
        products.forEach((product,index) => {
    
            if(product.id===id){
                result=index;
              //  console.log(product.id);
            }
        });
        return result;
    }
    componentDidMount(){
        this.setState({
            quantity:this.props.product.quantity,
        },()=>this.setState({
            quantityPrev:this.state.quantity,
        }))
    }
    onChangeQuantity=(number,product)=>{
        this.props.onChangeQuantity(number,product);
    }
    onIncrease=()=>{
        let id=this.findIndex(this.props.product.id,this.props.productInStore);
       console.log(this.props.productInStore);
      if(id!==-1){
        if(this.state.quantity<this.props.productInStore[id].quantity+this.state.quantityPrev){
          
            this.setState({
                quantity:this.state.quantity+1,
            },()=>this.onChangeQuantity(this.state.quantity,this.props.product))
        }
      }
      
    }
    onDecrease=()=>{
        if(this.state.quantity>0){
            this.setState({
                quantity:this.state.quantity-1,
            },()=>this.onChangeQuantity(this.state.quantity,this.props.product))
          }
       
    }
    onDelete=(product)=>{
        if(confirm('Bạn có chắc chắn muốn xóa?')){ //eslint-disable-line
            this.props.onDelete(product);
         }
       
    }
    render() {
        const {product,index,productInStore} = this.props;
       // console.log(this.state.quantity);
        return (
            <tr>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td><button type="button" className="btn btn-success fa fa-caret-left mr-10" onClick={()=>this.onDecrease()}></button>{this.state.quantity}<button type="button" className="btn btn-success fa fa-caret-right ml-10" onClick={()=>this.onIncrease()}></button></td>
                <td>{this.showTotal(product.price,this.state.quantity)}</td>
                <td><button type="button" className="btn btn-warning fa fa-remove " onClick={()=>this.onDelete(product)}></button></td>

            </tr>
        );
    }
    showTotal = (price, quantity) => {
        return price * quantity;
    }
}

export default CartItems;