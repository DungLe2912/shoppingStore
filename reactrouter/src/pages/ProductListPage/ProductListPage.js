import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import ProductList from '../../components/ProductList/ProductList';
import ProductItem from '../../components/ProductItem/ProductItem';
import * as actions from '../../actions/index';
import Modal from '../../components/Modal/Modal';
import LoadingScreen from '../../components/Loading/LoadingScreen';
import NotifiModal from '../../components/NotifiModal/NotifiModal';

class ProductListPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: false,
      isError: false,
      // eslint-disable-next-line react/no-unused-state
      errorMessage: '',
    }
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount() {
    this.setState({
      isLoading: true,
    });
  }

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { fetchProductRequest } = this.props;
    fetchProductRequest();
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    // eslint-disable-next-line react/prop-types
    if (nextProps && nextProps.products) {
      this.setState({
        isLoading: false,
      });
    }
    // eslint-disable-next-line react/prop-types
    if (nextProps && nextProps.error !== '') {
      this.setState({
        isLoading: false,
        isError: true,
      });
    }
  }

    onDelete = (id) => {
      // eslint-disable-next-line react/prop-types
      const { deleteProductRequest } = this.props;
      deleteProductRequest(id);
    }

    openModal = (product) => {
        //   console.log(product);
        this.props.openModal(product);
    }
    onChangeStatus = (product) => {
        this.props.changeStatus(product);
    }
    onClose = () => {
        this.setState({
            isError: false,
            isLoading: false,
            errorMessage: "",
        })
    }
    render() {
        const { products,error } = this.props;
        const { isLoading } = this.state;
        let user = JSON.parse(localStorage.getItem('USER'));
        //  console.log(productOnModal);
        if (user === null) {
            return <Redirect to="login" />
        }
        console.log('render');
        return (
            <React.Fragment>
                {isLoading ? (<LoadingScreen />)
                    :
                    <React.Fragment>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <Link to='/product/add' className="btn btn-info mb-10" ><span className="fa fa-plus mr-5"></span>Thêm sản phẩm</Link>
                            <ProductList onChangeStatus={this.onChangeStatus}>
                                {this.showProducts(products)}
                            </ProductList>

                            <Modal ></Modal>
                            <NotifiModal
                             isOpen={this.state.isError}
                             errorMessage={error}
                             onClose={this.onClose}
                            />
                        </div>
                    </React.Fragment>

                }
            </React.Fragment>
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
        error:state.Error,
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