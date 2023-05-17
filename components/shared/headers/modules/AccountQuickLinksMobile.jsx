import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { logOut } from '../../../../store/auth/action';
import { Dropdown, Menu } from 'antd';
import useTranslation from '~/config/lang';
import { useDispatch } from 'react-redux';

const AccountQuickLinksMobile = () => {
    const { Translate: t } = useTranslation();
    const dispatch = useDispatch();
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logOut());
    };
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
    const menu = (
        <Menu>
            {accountLinks.map((link) => (
                <Menu.Item key={link.url}>
                    <Link href={link.url}>
                        <a>{link.text}</a>
                    </Link>
                </Menu.Item>
            ))}

            <Menu.Item>
                <a href="#" onClick={handleLogout}>
                    {t('logout')}
                </a>
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu} placement="bottomLeft">
            <a href="#" className="header__extra ps-user--mobile">
                <i
                    className="icon-user"
                    style={{
                        color: 'white',
                    }}
                ></i>
            </a>
        </Dropdown>
    );
};

const mapStateToProps = (state) => {
    return state;
};
export default connect(mapStateToProps)(AccountQuickLinksMobile);
