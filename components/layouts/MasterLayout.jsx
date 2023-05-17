import React, { useEffect } from 'react';
import { BackTop, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import {
    setCartItems,
    setCompareItems,
    setWishlistTtems,
} from '~/store/ecomerce/action';
import PageLoader from '~/components/elements/common/PageLoader';
import NavigationList from '~/components/shared/navigation/NavigationList';
import LoginForm from '../partials/account/LoginForm';
import {
    loginModelController,
    registerModelController,
} from '~/store/auth/action';
import RegisterForm from '../partials/account/RegisterForm';
import Axios from 'axios';

const MasterLayout = ({ children }) => {
    const dispatch = useDispatch();
    const [cookies] = useCookies(['cart', 'compare', 'wishlist']);
    const isLoginModelOpen = useSelector(
        (state) => state.auth.isLoginModelOpen
    );
    const isRegisterModelOpen = useSelector(
        (state) => state.auth.isRegisterModelOpen
    );
    function initEcomerceValues() {
        if (cookies) {
            if (cookies.cart) {
                dispatch(setCartItems(cookies.cart));
            }
            if (cookies.wishlist) {
                dispatch(setWishlistTtems(cookies.wishlist));
            }
            if (cookies.compare) {
                dispatch(setCompareItems(cookies.compare));
            }
        }
    }

    useEffect(() => {
        initEcomerceValues();
    }, []);

    useEffect(() => {
        Axios.interceptors.response.use(
            function (response) {
                return response;
            },
            function (error) {
                if (
                    error?.response?.status === 401 &&
                    !window.location.pathname.includes('/account/wishlist')
                ) {
                    dispatch(loginModelController(true));
                } else {
                    return Promise.reject(error);
                }
            }
        );
    }, []);

    return (
        <>
            {children}
            <PageLoader />
            <NavigationList />
            <BackTop>
                <button className="ps-btn--backtop">
                    <i className="icon-arrow-up" />
                </button>
            </BackTop>
            <Modal
                title={null}
                footer={null}
                visible={isLoginModelOpen}
                onCancel={() => {
                    dispatch(loginModelController(false));
                }}
            >
                <LoginForm samePageRefresh={true} />
            </Modal>
            <Modal
                title={null}
                footer={null}
                visible={isRegisterModelOpen}
                onCancel={() => {
                    dispatch(registerModelController(false));
                }}
            >
                <RegisterForm samePageRefresh={true} />
            </Modal>
        </>
    );
};

export default MasterLayout;
