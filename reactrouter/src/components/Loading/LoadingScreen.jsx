import React from 'react';
import Skeleton from 'react-loading-skeleton';


const LoadingScreen = () => (
  <>
    <Skeleton />
    <Skeleton animation={false} />
    <Skeleton animation="wave" />
  </>
);

export default LoadingScreen;
