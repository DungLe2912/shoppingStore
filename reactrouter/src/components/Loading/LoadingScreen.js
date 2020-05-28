import React, { Component } from 'react';
import Skeleton from 'react-loading-skeleton';

class LoadingScreen extends Component {
    render() {
        return (
            <React.Fragment>
                <Skeleton />
                <Skeleton animation={false} />
                <Skeleton animation="wave" />
            </React.Fragment>
        );
    }
}

export default LoadingScreen;