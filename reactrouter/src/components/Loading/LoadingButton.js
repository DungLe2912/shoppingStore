import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";

class LoadingButton extends Component {
    render() {
        console.log('run button loading');
        return (
            <ReactLoading type={"bars"} color={"black"} />
        );
    }
}

export default LoadingButton;