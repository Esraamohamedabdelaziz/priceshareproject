import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ModulePaymentOrderSummary from '~/components/partials/account/modules/ModulePaymentOrderSummary';
import { loginModelController } from '~/store/auth/action';
import { useDispatch } from 'react-redux';

const Shipping = () => {
    const [username, setUsername] = useState('');
    const [shipTo, setShipTo] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        if (
            JSON.parse(localStorage.getItem('reg_checkout_ready')) &&
            JSON.parse(localStorage.getItem('reg_checkout_ready'))[
                'address_info'
            ] &&
            JSON.parse(localStorage.getItem('userData'))
        ) {
            setUsername(
                JSON.parse(localStorage.getItem('userData'))['username']
            );
            let shipToStr = '';
            if (
                JSON.parse(localStorage.getItem('reg_checkout_ready'))[
                    'address_info'
                ]['address_2']
            ) {
                shipToStr =
                    shipToStr +
                    JSON.parse(localStorage.getItem('reg_checkout_ready'))[
                        'address_info'
                    ]['address_2'] +
                    ', ';
            }
            shipToStr =
                shipToStr +
                JSON.parse(localStorage.getItem('reg_checkout_ready'))[
                    'address_info'
                ]['address_1'] +
                ', ';
            shipToStr =
                shipToStr +
                JSON.parse(localStorage.getItem('reg_checkout_ready'))[
                    'address_info'
                ]['city'];
            setShipTo(shipToStr);
        } else {
            dispatch(loginModelController(true));
        }
    }, []);

    return (
        <div className="ps-checkout ps-section--shopping">
            <div className="container">
                <div className="ps-section__header">
                    <h1>Shipping Information</h1>
                </div>
                <div className="ps-section__content">
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                            <div className="ps-block--shipping">
                                <div className="ps-block__panel">
                                    <figure>
                                        <small>Contact</small>
                                        <p>{username}</p>
                                        <Link href="/account/checkout">
                                            <a>Change</a>
                                        </Link>
                                    </figure>
                                    <figure>
                                        <small>Ship to</small>
                                        <p>{shipTo}</p>
                                        <Link href="/account/checkout">
                                            <a>Change</a>
                                        </Link>
                                    </figure>
                                </div>
                                <h4>Shipping Method</h4>
                                <div className="ps-block__panel">
                                    <figure>
                                        <small>Standard Shipping</small>
                                    </figure>
                                </div>
                                <div className="ps-block__footer">
                                    <Link href="/account/checkout">
                                        <a>
                                            <i className="icon-arrow-left mr-2"></i>
                                            Return to information
                                        </a>
                                    </Link>
                                    <Link href="/account/payment">
                                        <a className="ps-btn">
                                            Continue to payment
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  ps-block--checkout-order">
                            <div className="ps-form__orders">
                                <ModulePaymentOrderSummary shipping={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shipping;
