import React, { Component, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import Link from 'next/link';
import AccountQuickLinksMobile from './AccountQuickLinksMobile';
import { loginModelController } from '~/store/auth/action';
import { Drawer } from 'antd';
import PanelCategories from '../../panel/PanelCategories';
import useTranslation from '~/config/lang';

const MobileHeaderActions = ({ auth, ecomerce }) => {
    const { cartItems } = ecomerce;
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const { Translate: t } = useTranslation();
    return (
        <div className="navigation__right">
            <Link href="/account/shopping-cart">
                <a className="header__extra" href="#">
                    <i
                        className="icon-bag2"
                        style={{
                            color: 'white',
                        }}
                    ></i>
                    <span sty>
                        <i>{cartItems ? cartItems.length : 0}</i>
                    </span>
                </a>
            </Link>

            {auth.isLoggedIn && Boolean(auth.isLoggedIn) === true ? (
                <AccountQuickLinksMobile />
            ) : (
                <div className="header__extra">
                    <>
                        <i
                            onClick={() => dispatch(loginModelController(true))}
                            className="icon-user"
                            style={{
                                color: 'white',
                                textTransform: 'Uppercase',
                            }}
                        ></i>
                    </>
                </div>
            )}
            <a className="header__extra" onClick={() => setIsOpen(!isOpen)}>
                <i
                    className="icon-list4"
                    style={{
                        color: 'white',
                    }}
                ></i>
            </a>

            <Drawer
                className="ps-panel--mobile"
                placement="right"
                closable={false}
                onClose={() => setIsOpen(!isOpen)}
                visible={isOpen}
            >
                <div className="ps-panel--wrapper">
                    <div className="ps-panel__header">
                        <h3>{t('categories')}</h3>
                        <span
                            className="ps-panel__close"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <i className="icon-cross"></i>
                        </span>
                    </div>
                    <div className="ps-panel__content">
                        <PanelCategories />
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default connect((state) => state)(MobileHeaderActions);
