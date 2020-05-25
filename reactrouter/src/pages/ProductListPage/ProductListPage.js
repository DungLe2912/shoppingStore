import React, { Component, Profiler } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import ProductItem from '../../components/ProductItem/ProductItem';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import * as actions from '../../actions/index';
import Modal from '../../components/Modal/Modal';
import products from '../../reducers/products';
class ProductListPage extends Component {

    componentDidMount() {
        //  console.log(this.props.productOnModal);
        this.props.fetchProductRequest();
    }
    onDelete = (id) => {
        // console.log(id);
        this.props.deleteProductRequest(id);
    }
    openModal = (product) => {
        //   console.log(product);
        this.props.openModal(product);
    }
    // findIndex =(products,id)=>{
    //     let result = -1;
    //     products.forEach((product,index) => {
    //         if(product.id===id){
    //             result=index;
    //         }
    //     });
    //     return result;
    // }
    onChangeStatus = (product) => {
        this.props.changeStatus(product);
    }
    render() {
        const { products, productOnModal } = this.props;
        let user = JSON.parse(localStorage.getItem('USER'));
        //  console.log(productOnModal);
        if(user===null){
            return <Redirect to="login"/>
        }
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Link to='/product/add' className="btn btn-info mb-10" ><span className="fa fa-plus mr-5"></span>Thêm sản phẩm</Link>
                <ProductList onChangeStatus={this.onChangeStatus}>
                    {this.showProducts(products)}
                </ProductList>

                <Modal ></Modal>

            </div>
        );
    }
    showProducts = (products) => {
        let result = null;
        if (products.length > 0) {
            result = products.map((product, index) => {
                return (
                    <ProductItem
                        key={index}
                        product={product}
                        index={index}
                        onDelete={this.onDelete}
                        openModal={this.openModal}
                        onChangeStatus={this.onChangeStatus}
                    ></ProductItem>
                )
            })
        }
        return result;
    }
}
const mapStateToProps = (state) => {
    return {
        products: state.products,
        productOnModal: state.Modal,
        quantityModalProduct: state.quantityModalProduct,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchProductRequest: () => {
            dispatch(actions.fetchProductRequest())
        },
        deleteProductRequest: (id) => {
            dispatch(actions.deleteProductRequest(id))
        },

        addProduct: (product) => {
            dispatch(actions.addProduct(product))
        },
        openModal: (product) => {
            dispatch(actions.openModal(product))
        },
        changeStatus: (product) => {
            dispatch(actions.changeStatusRequest(product));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);