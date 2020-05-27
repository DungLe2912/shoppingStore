import React, { Component } from 'react';
import CartResult from './CartResult';
import NotifiModal from './Notification';

class Cart extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            openModal:false,
        }
    }
    
    onChangeQuantity=(number,product)=>{
      this.props.onChangeQuantity(number,product);
    }
    onOpenModal=()=>{
        this.setState({
            openModal:true,
        },()=>this.payOnCart(true));
    }
    onDelete=(product)=>{
        this.props.onDelete(product);
    }
    payOnCart=(check)=>{
        this.props.payOnCart(check);
    }
    render() {
        const {productsTotal,productsOnCartPrev} = this.props;
      //  console.log(productsTotal);
        return (
            <div>

                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Mã</th>
                                <th>Tên sản phẩm</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Đơn giá</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.children}
                            
                        </tbody>
                        
                       
                        
                    </table>
                    
                </div>
                <CartResult productsTotal={productsTotal}/>
                <NotifiModal productsTotal={productsOnCartPrev} openModal={this.state.openModal} />
                <button type="button" className="btn btn-lg btn-primary " onClick={this.onOpenModal}>Thanh toán</button>
            </div>
        );
    }
   
}

export default Cart;