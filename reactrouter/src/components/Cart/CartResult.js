import React, { Component } from 'react';

class CartResult extends Component {
    render() {
        const {productsTotal} = this.props;
       // console.log(productsTotal);
        return (
            <div className="input-group lable-flex">
                <h3>Tổng tiền: {this.showTotal(productsTotal)}</h3>

            </div>
        );
    }
    showTotal=(products)=>{
        let result=0;
        products.map((product,index)=>{
            result+=(product.price*product.quantity);
        })
        return result; 
    }
}

export default CartResult;