import React, { Component } from 'react';
import Link from 'next/link';
import useTranslation from '~/config/lang';

const RecentViewedProducts = () => {
    const { Translate: t } = useTranslation();
    const accountLinks = [
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
            icon: 'icon-map-marker',
        },
        {
            text: 'Recent Viewed Product',
            url: '/account/recent-viewed-product',
            active: true,
            icon: 'icon-store',
        },
        {
            text: t('wishlist'),
            url: '/account/wishlist',
            icon: 'icon-heart',
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
                    <div className="col-lg-4">
                        <div className="ps-section__left">
                            <aside className="ps-widget--account-dashboard">
                                <div className="ps-widget__header">
                                    <img src="/static/img/users/3.jpg" />
                                    <figure>
                                        <figcaption>Hello</figcaption>
                                        <p>username@gmail.com</p>
                                    </figure>
                                </div>
                                <div className="ps-widget__content">
                                    <ul>
                                        {accountLinks.map((link) => (
                                            <li
                                                key={link.text}
                                                className={
                                                    link.active ? 'active' : ''
                                                }
                                            >
                                                <Link href={link.url}>
                                                    <a>
                                                        <i
                                                            className={
                                                                link.icon
                                                            }
                                                        ></i>
                                                        {link.text}
                                                    </a>
                                                </Link>
                                            </li>
                                        ))}
                                        <li>
                                            <Link href="/account/my-account">
                                                <a>
                                                    <i className="icon-power-switch"></i>
                                                    {t('logout')}
                                                </a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <section className="ps-section--account-setting">
                            <div className="ps-section__content">
                                <p>No product here.</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RecentViewedProducts;
