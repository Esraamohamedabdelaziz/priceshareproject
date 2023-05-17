import React, { Component } from 'react';
import Link from 'next/link';
import { Form, Input, Radio, DatePicker } from 'antd';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import TableNotifications from './modules/TableNotifications';
import useTranslation from '~/config/lang';

const Wallet3 = () => {
    const { Translate: t } = useTranslation();
    const accountLinks = [
        {
            text: t('wallet_priceshare'),
            url: '/account/wallet',
            icon: 'icon-wallet',
            active: true,
        },
        {
            text: t('account_info'),
            url: '/account/user-information',
            icon: 'icon-user',
        },
        {
            text: 'Notifications',
            url: '/account/notifications',
            icon: 'icon-alarm-ringing',
        },
        {
            text: 'Invoices',
            url: '/account/invoices',
            icon: 'icon-papers',
        },
        {
            text: 'Address',
            url: '/account/addresses',
            icon: 'icon-papers',
        },
        {
            text: 'Recent Viewed Product',
            url: '/account/recent-viewed-product',
            icon: 'icon-papers',
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
    ];
    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-sm-12">
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} />
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div className="ps-section__header">
                                    <h3 style={{ color: 'black' }}>
                                        PriceShare {t('wallet')}{' '}
                                        <span
                                            style={{
                                                float: 'right',
                                                fontWeight: '700',
                                            }}
                                        >
                                            0.00 EGP
                                        </span>
                                    </h3>
                                </div>
                                <div className="ps-section__content">
                                    <h4 style={{ color: 'black' }}>
                                        Looks like you dont't own a PriceShare
                                        package just yet!
                                    </h4>
                                    <h4 style={{ color: 'black' }}>
                                        Buy a{' '}
                                        <a
                                            href="#"
                                            style={{
                                                color: '#09c',
                                                fontWeight: '800',
                                            }}
                                        >
                                            PriceShare Package
                                        </a>{' '}
                                        of 10 invitations for
                                        <span
                                            style={{
                                                color: '#e32017',
                                                fontWeight: '800',
                                            }}
                                        >
                                            {' '}
                                            10,000 EGP
                                        </span>{' '}
                                        by redeeming a PriceShare invitation
                                        link below for only 1,000 EGP
                                    </h4>
                                    <br />
                                    <div className="ps-form__content">
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="E PriceShare invitation link below to redeem"
                                            />
                                        </div>
                                        <div className="form-group submit">
                                            <button className="ps-btn">
                                                Redeem Invitation
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Wallet3;
