import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { Drawer, Modal } from 'antd';
import PanelMenu from '../panel/PanelMenu';
import PanelCartMobile from '../panel/PanelCartMobile';
import PanelSearch from '../panel/PanelSearch';
import PanelCategories from '../panel/PanelCategories';

import useTranslation from '~/config/lang';

const NavigationList = () => {
    const { Translate: t } = useTranslation();
    const [drawers, setDrawers] = useState({
        menuDrawer: false,
        cartDrawer: false,
        searchDrawer: false,
        categoriesDrawer: false,
    });

    const { menuDrawer, searchDrawer, cartDrawer, categoriesDrawer } = drawers;

    const handleDrawerClose = () => {
        setDrawers({
            menuDrawer: false,
            cartDrawer: false,
            searchDrawer: false,
            categoriesDrawer: false,
        });
    };

    const handleShowMenuDrawer = () => {
        setDrawers({
            menuDrawer: !menuDrawer,
            cartDrawer: false,
            searchDrawer: false,
            categoriesDrawer: false,
        });
    };

    const handleShowCartDrawer = () => {
        setDrawers({
            menuDrawer: false,
            cartDrawer: !cartDrawer,
            searchDrawer: false,
            categoriesDrawer: false,
        });
    };
    const handleShowSearchDrawer = () => {
        setDrawers({
            menuDrawer: false,
            cartDrawer: false,
            searchDrawer: !searchDrawer,
            categoriesDrawer: false,
        });
    };

    const handleShowCategoriesDrawer = () => {
        setDrawers({
            menuDrawer: false,
            cartDrawer: false,
            searchDrawer: false,
            categoriesDrawer: !categoriesDrawer,
        });
    };
    return (
        <div className="navigation--list">
            <Drawer
                className="ps-panel--mobile"
                placement="right"
                closable={false}
                onClose={handleDrawerClose}
                visible={menuDrawer}
            >
                <div className="ps-panel--wrapper">
                    <div className="ps-panel__header">
                        <h3>Menu</h3>
                        <span
                            className="ps-panel__close"
                            onClick={handleDrawerClose}
                        >
                            <i className="icon-cross"></i>
                        </span>
                    </div>
                    <div className="ps-panel__content">
                        <PanelMenu />
                    </div>
                </div>
            </Drawer>
            <Drawer
                className="ps-panel--mobile"
                placement="right"
                closable={false}
                onClose={handleDrawerClose}
                visible={cartDrawer}
            >
                <div className="ps-panel--wrapper">
                    <div className="ps-panel__header">
                        <h3
                            style={{
                                color: 'black',
                            }}
                        >
                            {t('shopping_cart')}
                        </h3>
                        <span
                            className="ps-panel__close"
                            onClick={handleDrawerClose}
                        >
                            <i className="icon-cross"></i>
                        </span>
                    </div>
                    <div className="ps-panel__content">
                        <PanelCartMobile />
                    </div>
                </div>
            </Drawer>
            <Drawer
                className="ps-panel--mobile"
                placement="right"
                closable={false}
                onClose={handleDrawerClose}
                visible={searchDrawer}
            >
                <div className="ps-panel--wrapper">
                    <div className="ps-panel__header">
                        <h3>Search</h3>
                        <span
                            className="ps-panel__close"
                            onClick={handleDrawerClose}
                        >
                            <i className="icon-cross"></i>
                        </span>
                    </div>
                    <div className="ps-panel__content">
                        <PanelSearch />
                    </div>
                </div>
            </Drawer>
            <Drawer
                className="ps-panel--mobile"
                placement="right"
                closable={false}
                onClose={handleDrawerClose}
                visible={categoriesDrawer}
            >
                <div className="ps-panel--wrapper">
                    <div className="ps-panel__header">
                        <h3>{t('categories')}</h3>
                        <span
                            className="ps-panel__close"
                            onClick={handleDrawerClose}
                        >
                            <i className="icon-cross"></i>
                        </span>
                    </div>
                    <div className="ps-panel__content">
                        <PanelCategories />
                    </div>
                </div>
            </Drawer>
            <div className="navigation__content">
                <a
                    className={`navigation__item ${
                        menuDrawer === true ? 'active' : ''
                    }`}
                    onClick={handleShowMenuDrawer}
                >
                    <i className="icon-menu"></i>
                    <span> Menu</span>
                </a>
                <a
                    className={`navigation__item ${
                        categoriesDrawer === true ? 'active' : ''
                    }`}
                    onClick={handleShowCategoriesDrawer}
                >
                    <i className="icon-list4"></i>
                    <span> {t('categories')}</span>
                </a>
                <a
                    className={`navigation__item ${
                        searchDrawer === true ? 'active' : ''
                    }`}
                    onClick={handleShowSearchDrawer}
                >
                    <i className="icon-magnifier"></i>
                    <span> Search</span>
                </a>
                <a
                    className={`navigation__item ${
                        cartDrawer === true ? 'active' : ''
                    }`}
                    onClick={handleShowCartDrawer}
                >
                    <i className="icon-bag2"></i>
                    <span> Cart</span>
                </a>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return state.setting;
};
export default connect(mapStateToProps)(NavigationList);
