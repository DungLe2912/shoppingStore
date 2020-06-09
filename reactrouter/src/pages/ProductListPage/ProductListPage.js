/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import ProductList from '../../components/ProductList/ProductList';
import ProductItem from '../../components/ProductItem/ProductItem';
import * as actions from '../../actions/products';
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
    };
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
      // eslint-disable-next-line react/prop-types
      const { openModal } = this.props;
      openModal(product);
    }

    onChangeStatus = (product) => {
      // eslint-disable-next-line react/prop-types
      const { changeStatus } = this.props;
      changeStatus(product);
    }

    onClose = () => {
      this.setState({
        isError: false,
        isLoading: false,
        // eslint-disable-next-line react/no-unused-state
        errorMessage: '',
      });
    }

    render() {
      // eslint-disable-next-line react/prop-types
      const { products, error } = this.props;
      const { isLoading, isError } = this.state;
      const user = JSON.parse(localStorage.getItem('USER'));
      //  console.log(productOnModal);
      if (user === null) {
        return <Redirect to="login" />;
      }
      return (
        <React.Fragment>
          {isLoading ? (<LoadingScreen />)
            : <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <Link to="/product/add" className="btn btn-info mb-10">
                <span className="fa fa-plus mr-5" />
                Thêm sản phẩm
              </Link>
              <ProductList onChangeStatus={this.onChangeStatus}>
                {this.showProducts(products)}
              </ProductList>

              <Modal />
              <NotifiModal
                isOpen={isError}
                errorMessage={error}
                onClose={this.onClose}
              />
            </div>}
        </React.Fragment>
      );
    }

    showProducts = (products) => {
      let result = null;
      if (products.length > 0) {
        result = products.map((product, index) => (
          <ProductItem
              // eslint-disable-next-line react/no-array-index-key
            key={index}
            product={product}
            index={index}
            onDelete={this.onDelete}
            openModal={this.openModal}
            onChangeStatus={this.onChangeStatus}
          />
        ));
      }
      return result;
    }
}
const mapStateToProps = (state) => ({
  products: state.products,
  productOnModal: state.Modal,
  quantityModalProduct: state.quantityModalProduct,
  error: state.Error,
});
const mapDispatchToProps = (dispatch) => ({
  fetchProductRequest: () => {
    dispatch(actions.fetchProductRequest());
  },
  deleteProductRequest: (id) => {
    dispatch(actions.deleteProductRequest(id));
  },

  addProduct: (product) => {
    dispatch(actions.addProduct(product));
  },
  openModal: (product) => {
    dispatch(actions.openModal(product));
  },
  changeStatus: (product) => {
    dispatch(actions.changeStatusRequest(product));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
