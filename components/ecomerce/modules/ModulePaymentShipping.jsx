import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { loginModelController } from '~/store/auth/action';

const ModulePaymentShipping = () => {
    const [username, setUsername] = useState('');
    const [shipTo, setShipTo] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        if (
            JSON.parse(localStorage.getItem('reg_checkout_ready')) &&
            JSON.parse(localStorage.getItem('reg_checkout_ready'))[
                'address_info'
            ] &&
            JSON.parse(localStorage.getItem('userData')) &&
            JSON.parse(localStorage.getItem('userData'))['username']
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
        <>
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
        </>
    );
};

export default ModulePaymentShipping;
