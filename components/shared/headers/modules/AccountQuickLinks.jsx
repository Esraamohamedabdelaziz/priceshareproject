import React from 'react';
import { connect, useDispatch } from 'react-redux';
import Link from 'next/link';
import {
    loginModelController,
    logOut,
    registerModelController,
} from '~/store/auth/action';
import useTranslation from '~/config/lang';

const AccountQuickLinks = (props) => {
    const dispatch = useDispatch();
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logOut());
    };

    const { Translate: t } = useTranslation();
    const accountLinks = [
        {
            text: t('account_info'),
            url: '/account/user-information',
        },
        {
            text: t('wallet'),
            url: '/account/wallet',
        },

        {
            text: t('wishlist'),
            url: '/account/wishlist',
        },
        {
            text: t('orders'),
            url: '/account/orders',
        },
        {
            text: t('addresses')?.address,
            url: '/addresses',
            icon: 'icon-cube',
        },
    ];
    const { isLoggedIn } = props;

    // View
    const linksView = accountLinks.map((item) => (
        <li key={item.text}>
            <Link href={item.url}>
                <a>
                    <span>{item.text}</span>
                </a>
            </Link>
        </li>
    ));

    if (isLoggedIn === true) {
        return (
            <div className="ps-block--user-account">
                <i className="icon-user"></i>
                <div className="ps-block__content">
                    <ul className="ps-list--arrow">
                        {linksView}
                        <li className="ps-block__footer">
                            <a href="#" onClick={(e) => handleLogout(e)}>
                                <span>{t('logout')}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    } else {
        return (
            <div className="ps-block--user-header">
                <div className="ps-block__left">
                    <i className="icon-user"></i>
                </div>
                <div className="ps-block__right">
                    <>
                        <a onClick={() => dispatch(loginModelController(true))}>
                            {t('login')}
                        </a>
                    </>
                    <>
                        <a
                            onClick={() =>
                                dispatch(registerModelController(true))
                            }
                        >
                            {t('register')}
                        </a>
                    </>
                </div>
            </div>
        );
    }
};

export default connect((state) => state)(AccountQuickLinks);
