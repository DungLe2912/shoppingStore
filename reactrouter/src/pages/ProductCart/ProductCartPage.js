import React, { Component } from 'react';
import Cart from '../../components/Cart/Cart'
import CartItems from '../../components/Cart/CartItems'
import * as actions from '../../actions/index';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
class ProductCartPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            productsOnCart:[],
            productsOnCartPrev:[],
        }
    }
   componentDidMount(){
  //  console.log("componentDidMount");
    this.setState({
        productsOnCart:this.props.products,
    });
   }
   onDelete=(product)=>{
      this.props.deleteProductOnCard(product);
      this.props.updateQuantityProduct(-product.quantity,this.props.productInStore[this.findIndex(product.id,this.props.productInStore)]);
   }
   UNSAFE_componentWillReceiveProps(nextProps){
    //console.log("UNSAFE_componentWillReceiveProps");
       if(nextProps && nextProps.products){
           this.setState({
               productsOnCart:nextProps.products,
           })
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
    componentWillMount(){
     //   console.log("componentwillmount");
    }
    onChangeQuantity=(number,product)=>{
       this.props.updateQuantityProductOnCart(number,product);
       this.props.updateQuantityProduct(number-product.quantity,this.props.productInStore[this.findIndex(product.id,this.props.productInStore)]);
    }
    payOnCart=(data)=>{
        console.log("runPayOnCart");
        if(data===true){
           this.setState({
               productsOnCartPrev:this.state.productsOnCart,
           },()=> this.props.payCart())
        }
     //   console.log(data);
    }
    render() {
        let {products} = this.props;
        let user = JSON.parse(localStorage.getItem('USER'));
        //  console.log(productOnModal);
        if(user===null){
            return <Redirect to="login"/>
        }
        return (
            <div>
               <Cart productsTotal={this.state.productsOnCart} 
               productsOnCartPrev={this.state.productsOnCartPrev}
               onChangeQuantity={this.onChangeQuantity}
               payOnCart={this.payOnCart}
               onDelete={this.onDelete}
               >
                   {this.showProductOnCart(products)}
               </Cart>
            </div>
        );
    }
    showProductOnCart=(products)=>{
        let result = null;
        if(products.length>0){
            //console.log("run");
            result = products.map((product,index)=>{
               return (
                <CartItems
                onChangeQuantity={this.onChangeQuantity}
                key={index}
                product={product}
                index={index}
                productInStore={this.props.productInStore}
                onDelete={this.onDelete}
                >
                </CartItems>
               )
            })
        }
        return result;
    }
}

const mapStateToProps = (state) => {
    return {
        products:state.CartProduct,
        quantity:state.quantityModalProduct,
        productModal:state.Modal,
        productInStore:state.products,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        updateQuantityProductOnCart:(number,product)=>{
            dispatch(actions.updateQuantityProductOnCart(number,product));
        },
        updateQuantityProduct:(number,product)=>{
            dispatch(actions.updateQuantityProductRequest(number,product));
        },
        payCart:()=>{
            dispatch(actions.payCart());
        },
        deleteProductOnCard:(product)=>{
            dispatch(actions.deleteProductOnCard(product));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductCartPage);
