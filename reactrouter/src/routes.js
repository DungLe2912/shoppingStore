import React from 'react';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import ProductListPage from './pages/ProductListPage/ProductListPage';
import ProductActionPage from './pages/ProductActionPage/ProductActionPage';
import ProductCartPage from './pages/ProductCart/ProductCartPage';
import LoginPage from './pages/LoginPage/LoginPage';
import LogoutPage from './pages/Logout/LogoutPage';
import SignupPage from './pages/SignupPage/SignupPage';

    const routes = [
    {
        path : '/',
        exact : true,
        main:()=> <HomePage/>
    },
    {
        path : '/product-list',
        exact : false,
        main:()=> <ProductListPage/>
    },
    {
        path : '/product-cart',
        exact : false,
        main:()=> <ProductCartPage/>
    },
    {
        path : '/product/add',
        exact : false,
        main:({history})=> <ProductActionPage history={history}/>
    },
    {
        path : '/product/:id/edit',
        exact : false,
        main:({match,history})=> <ProductActionPage match={match} history={history}/>
    },
    {
        path : '/login',
        exact : false,
        main:()=> <LoginPage/>
    },
    {
        path : '/logout',
        exact : false,
        main:({history})=> <LogoutPage history={history}/>
    },
    {
        path : '/sign-up',
        exact : false,
        main:({history})=> <SignupPage history={history}/>
    },
    {
        path : '',
        exact : false,
        main:()=> <NotFoundPage/>
    },
    
];

export default routes;