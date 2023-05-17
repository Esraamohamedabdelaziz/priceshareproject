import React, {useState} from 'react';
import {Radio} from 'antd';
import {useRouter} from 'next/router';
import CheckoutService from '../../../services/CheckoutService';
import {getCartItemsFromCookies} from '~/utilities/ecomerce-helpers';
import Router from 'next/router';
import {loginModelController} from '~/store/auth/action';
import {useDispatch} from 'react-redux';

const ModulePaymentMethods = () => {
    const Router = useRouter();
    const [method, setMethod] = useState(1);
    const dispatch = useDispatch();
    const [errorCurrent, setErrorCurrent] = useState(null);
    const [errorNeed, setErrorNeed] = useState(null);


    function handleChangeMethod(e) {
        setMethod(e.target.value); //e.target.value
    }

    function handleSubmit(e, payment_method) {
        e.preventDefault();
        const checkoutService = new CheckoutService();
        console.log(getCartItemsFromCookies());
        let product_ids_quanities = getCartItemsFromCookies();
        // Router.push('/account/payment-success');

        if (
            JSON.parse(localStorage.getItem('reg_checkout_ready')) &&
            JSON.parse(localStorage.getItem('reg_checkout_ready'))[
                'address_info'
                ] &&
            JSON.parse(localStorage.getItem('userData'))
        ) {
            checkoutService
                .createOrder(
                    product_ids_quanities,
                    JSON.parse(localStorage.getItem('reg_checkout_ready'))[
                        'address_info'
                        ],
                    payment_method
                )
                .then((res) => {
                    console.log(res);
                    if (res.status == 406) {
                        console.log("error not enough points");
                        setErrorCurrent(res.data['current_points']);
                        setErrorNeed(res.data['needed_amount']);
                    } else {
                        window.localStorage.setItem(
                            'reg_checkout_done',
                            JSON.stringify({order_id: res})
                        );
                        window.localStorage.removeItem('reg_checkout_ready');
                        Router.push('/account/payment-success');
                    }

                });
        } else {
            dispatch(loginModelController(true));
        }
    }

    return (
        <>
            <h4>Payment Methods</h4>
            <div className="ps-block--payment-method">
                <div className="ps-block__header">
                    <Radio.Group
                        onChange={(e) => handleChangeMethod(e)}
                        value={method}
                    >
                        <Radio value={1}>Visa / Master Card</Radio>
                        <Radio value={2}>PriceShare Points</Radio>
                        <Radio value={3}>
                            PriceShare Points + Visa / Master Card
                        </Radio>
                        <Radio value={4}>Cash on Delivery</Radio>
                        <Radio value={5}>
                            PriceShare Points + Cash on Delivery
                        </Radio>
                    </Radio.Group>
                </div>
                <div className="ps-block__content">
                    {method === 1 ? (
                        <div className="ps-block__tab">
                            <div className="form-group">
                                <label>Card Number</label>
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label>Card Holders</label>
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="row">
                                <div className="col-sm-4 col-4">
                                    <div className="form-group">
                                        <label>Expiration Date (MM/YY)</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="01/21"
                                        />
                                    </div>
                                </div>
                                <div className=" col-sm-4 col-4">
                                    <div className="form-group">
                                        <label>CVV</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <button className="ps-btn ps-btn--fullwidth">
                                    Submit
                                </button>
                            </div>
                        </div>
                    ) : method === 2 ? (
                        <div className="ps-block__tab">
                            {errorCurrent ? (
                                <p style={{color: 'red'}}>
                                    Your current points are not enough, {errorCurrent} points. Points needed are {errorNeed} points.
                                </p>
                            ) : (
                                ''
                            )}
                            <button
                                className="ps-btn ps-btn--fullwidth"
                                onClick={(e) =>
                                    handleSubmit(e, 'PRICESHARE_POINTS')
                                }
                            >
                                {' '}
                                Process with PriceShare points
                            </button>
                        </div>
                    ) : method === 3 ? (
                        <div className="ps-block__tab">
                            <button className="ps-btn ps-btn--fullwidth">
                                {' '}
                                Process with PriceShare points + Visa / Master
                                Card
                            </button>
                        </div>
                    ) : method === 4 ? (
                        <div className="ps-block__tab">
                            <button
                                className="ps-btn ps-btn--fullwidth"
                                onClick={(e) => handleSubmit(e, 'COD')}
                            >
                                Process with Cash on Delivery
                            </button>
                        </div>
                    ) : (
                        <div className="ps-block__tab">
                            <button className="ps-btn ps-btn--fullwidth">
                                {' '}
                                Process with PriceShare points + Cash on
                                Delivery
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ModulePaymentMethods;
