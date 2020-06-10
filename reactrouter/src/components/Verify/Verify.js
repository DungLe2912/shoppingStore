/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';

class Verify extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      txtCode: '',
    };
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
    const { txtCode } = this.state;
    e.preventDefault();
    const code = txtCode;
    this.onVerify(code);
  }

  onVerify = (code) => {
    const { onVerify } = this.props;
    onVerify(code);
  }

  render() {
    const { txtCode } = this.state;
    return (
      <div className="container ">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <div id="first">
              <div className="myform form ">
                <div className="logo mb-3">
                  <div className="col-md-12 text-center">
                    <h1>Verify Code</h1>
                  </div>
                </div>
                <form onSubmit={this.onSave}>
                  <div className="form-group">
                    <label>Enter code:</label>
                    <input type="text" name="txtCode" className="form-control" value={txtCode} placeholder="Enter your name" onChange={this.onChange} />
                  </div>
                  <div className="col-md-12 text-center ">
                    <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm">Verify</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Verify;
