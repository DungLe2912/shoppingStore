import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';
import * as actions from '../../actions/index';
import { connect } from 'react-redux';
class ProductActionPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            id: '',
            txtName: '',
            txtPrice: '',
            txtQuantity:'',
            chkbStatus: ''
        }
    }
    componentDidMount(){
        const {match} = this.props;
        if(match){
            const id = match.params.id;
            this.props.getInforEditProductRequest(id);
            
        }
    }
    componentWillReceiveProps(nextProps){
       // console.log(nextProps.editproduct);
        if(nextProps&&nextProps.editproduct){
            this.setState({
                id:nextProps.editproduct.id,
                txtName:nextProps.editproduct.name,
                txtPrice:nextProps.editproduct.price,
                txtQuantity:nextProps.editproduct.quantity,
                chkbStatus:nextProps.editproduct.status,
            })
        }
    }
    onChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        });
    }
    onSave = (e) => {
        e.preventDefault();
        const { txtName, txtPrice, txtQuantity,chkbStatus, id } = this.state;
        const product={ txtName, txtPrice, chkbStatus,txtQuantity, id }
        const { history } = this.props;
        if (id) {
            this.props.editProductRequest(id,product);
            history.goBack();
        }
        else {
            let product = this.state;
            console.log(product);
            this.props.addProductRequest(product);
            history.goBack();
        }
    }
    render() {
        const { txtName, txtPrice, chkbStatus,txtQuantity } = this.state;
        let user = JSON.parse(localStorage.getItem('USER'));
        //  console.log(productOnModal);
        if(user===null){
            return <Redirect to="login"/>
        }
        return (

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
            </div>


        );
    }
}
const mapStateToProps = (state) => {
    return {
        editproduct:state.editProduct,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        addProductRequest: (product) => {
            dispatch(actions.addProductRequest(product));
        },
        getInforEditProductRequest:(id)=>{
            dispatch(actions.getInforEditProductRequest(id));
        },
        editProductRequest:(id,product)=>{
            dispatch(actions.editProductRequest(id,product));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);