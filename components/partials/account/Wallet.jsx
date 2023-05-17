import React, { Component, useEffect, useState } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import TableWallet from './modules/TableWallet';
import Router from 'next/router';
import { loginModelController } from '~/store/auth/action';
import { useDispatch } from 'react-redux';
import useTranslation from '~/config/lang';

const Wallet = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (JSON.parse(localStorage.getItem('userData'))) {
                // do nothing
            } else {
                dispatch(loginModelController(true));
            }
        }
    });
    const { Translate: t } = useTranslation();
    const accountLinks = [
        {
            text: t('account_info'),
            url: '/account/user-information',
            icon: 'icon-user',
        },
        {
            text: t('wallet_priceshare'),
            url: '/account/wallet',
            icon: 'icon-wallet',
            active: true,
        },
        {
            text: t('wishlist'),
            url: '/account/wishlist',
            icon: 'icon-papers',
        },
        {
            text: t('orders'),
            url: '/account/orders',
            icon: 'icon-cube',
        },
        {
            text: t('addresses')?.address,
            url: '/addresses',
            icon: 'icon-cube',
        },
    ];
    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-12">
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} />
                        </div>
                    </div>
                    <div className="col-lg-8 col-12">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div className="ps-section__header">
                                    <h3 style={{ color: 'black' }}>
                                        PriceShare {t('wallet')}
                                    </h3>
                                </div>

                                <div className="ps-section__content">
                                    <TableWallet />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Wallet;
