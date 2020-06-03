import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Cart from '../../components/Cart/Cart'
import CartItems from '../../components/Cart/CartItems'
import * as actions from '../../actions/index';

class ProductCartPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      productsOnCart: [],
      productsOnCartPrev: [],
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { products, fetchProductRequest } = this.props;
    this.setState({
      productsOnCart: products,
    });
    fetchProductRequest();
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    // eslint-disable-next-line react/prop-types
    if (nextProps && nextProps.products) {
      this.setState({
        // eslint-disable-next-line react/prop-types
        productsOnCart: nextProps.products,
      });
    }
  }

   onDelete = (product) => {
     // eslint-disable-next-line react/prop-types
     const { deleteProductOnCard, updateQuantityProduct, productInStore } = this.props;
     deleteProductOnCard(product);
     updateQuantityProduct(-product.quantity, productInStore[
       this.findIndex(product.id, productInStore)]);
   }

    findIndex=(id, products) => {
      let result = -1;
      products.forEach((product, index) => {
        if (product.id === id) {
          result = index;
        }
      });
      return result;
    }

    onChangeQuantity=(number,product)=>{
      // eslint-disable-next-line react/prop-types
      const { updateQuantityProductOnCart, updateQuantityProduct, productInStore } = this.props;
      updateQuantityProductOnCart(number, product);
      updateQuantityProduct(number-product.quantity, productInStore[this.findIndex(product.id, productInStore)]);
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
        console.log(this.state);
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
        fetchProductRequest: () => {
            dispatch(actions.fetchProductRequest())
        },
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
