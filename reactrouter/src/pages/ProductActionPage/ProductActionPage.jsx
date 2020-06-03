/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-shadow */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-deprecated */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-fragments */
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import NotifiModal from '../../components/NotifiModal/NotifiModal';
import LoadingScreen from '../../components/Loading/LoadingScreen';

class ProductActionPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      id: '',
      txtName: '',
      txtPrice: '',
      txtQuantity: '',
      chkbStatus: '',
      isLoading: false,
      isError: false,
      errorMessage: '',

    };
  }

  componentWillMount() {
    this.setState({
      isLoading: true,
    });
  }

  componentDidMount() {
    const { match, getInforEditProductRequest } = this.props;
    if (match) {
      const { id } = match.params;
      getInforEditProductRequest(id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.editproduct) {
      this.setState({
        id: nextProps.editproduct.id,
        txtName: nextProps.editproduct.name,
        txtPrice: nextProps.editproduct.price,
        txtQuantity: nextProps.editproduct.quantity,
        chkbStatus: nextProps.editproduct.status,
        isLoading: false,
      });
    }
    if (nextProps && nextProps.error !== '') {
      this.setState({
        isLoading: false,
        isError: true,
      });
    }
  }

    onClose = () => {
      const { history } = this.props;
      this.setState({
        isError: false,
        isLoading: false,
        errorMessage: '',
      });
      history.goBack();
    }

    onChange = (e) => {
      const { target } = e;
      const { name } = target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      this.setState({
        [name]: value,
      });
    }

    onSave = (e) => {
      e.preventDefault();
      const {
        txtName, txtPrice, txtQuantity, chkbStatus, id,
      } = this.state;
      const product = {
        txtName, txtPrice, chkbStatus, txtQuantity, id,
      };
      const { editProductRequest, addProductRequest } = this.props;
      const { history } = this.props;
      if (id) {
        editProductRequest(id, product);
        history.goBack();
      } else {
        const product = this.state;
        addProductRequest(product);
        history.goBack();
      }
    }

    render() {
      const {
        txtName, txtPrice, chkbStatus, txtQuantity, isLoading, isError,
      } = this.state;
      const { error } = this.props;
      const user = JSON.parse(localStorage.getItem('USER'));
      if (user === null) {
        return <Redirect to="login" />;
      }
      return (
        <React.Fragment>
          {isLoading ? (<LoadingScreen />)
            : <React.Fragment>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <form onSubmit={this.onSave}>
                  <div className="form-group">
                    <label>Tên sản phẩm:</label>
                    <input type="text" className="form-control" name="txtName" value={txtName} onChange={this.onChange} />
                  </div>
                  <div className="form-group">
                    <label>Giá:</label>
                    <input type="number" className="form-control" name="txtPrice" value={txtPrice} onChange={this.onChange} />
                  </div>
                  <div className="form-group">
                    <label>Số lượng:</label>
                    <input type="number" className="form-control" name="txtQuantity" value={txtQuantity} onChange={this.onChange} />
                  </div>
                  <div className="form-group">
                    <label>Trạng thái:</label>
                  </div>

                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="chkbStatus" value={chkbStatus} onChange={this.onChange} checked={chkbStatus} />
                      Còn hàng
                    </label>
                  </div>
                  <Link to="/product-list" className="btn btn-danger mr-10">Trở lại</Link>
                  <button type="submit" className="btn btn-primary">Lưu lại</button>

                </form>
                <NotifiModal
                  isOpen={isError}
                  errorMessage={error}
                  onClose={this.onClose}
                />
              </div>
            </React.Fragment>}
        </React.Fragment>
      );
    }
}
const mapStateToProps = (state) => ({
  editproduct: state.editProduct,
  error: state.Error,
});
const mapDispatchToProps = (dispatch) => ({
  addProductRequest: (product) => {
    dispatch(actions.addProductRequest(product));
  },
  getInforEditProductRequest: (id) => {
    dispatch(actions.getInforEditProductRequest(id));
  },
  editProductRequest: (id, product) => {
    dispatch(actions.editProductRequest(id, product));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);
