import React, { Component } from 'react';
import CurrencyDropdown from './modules/CurrencyDropdown';
import Link from 'next/link';
import LanguageSwicher from './modules/LanguageSwicher';
import MobileHeaderActions from './modules/MobileHeaderActions';
import HeaderSearch from './HeaderSearch';

import React from 'react';
import useTranslation from '~/config/lang';

const HeaderMobileElectronic = () => {
    const { Translate: t } = useTranslation();

    return (
        <header className="header header--mobile electronic">
            <div className="header__top">
                <div className="header__left">
                    <p>Welcome to PriceShare Online Shopping Store !</p>
                </div>
                <div className="header__right">
                    <ul className="navigation__extra">
                        <li>
                            <Link href="/vendor/become-a-vendor">
                                <a>{t('sell_on_priceshare')}</a>
                            </Link>
                        </li>
                        <li>
                            <CurrencyDropdown />
                        </li>
                        <li>
                            <LanguageSwicher />
                        </li>
                    </ul>
                </div>
            </div>
            <div className="navigation--mobile">
                <div className="navigation__left">
                    <Link href="/">
                        <a className="ps-logo">
                            <img
                                src="/static/img/logo-electronic.png"
                                alt="PriceShare"
                            />
                        </a>
                    </Link>
                </div>
                <MobileHeaderActions />
            </div>
            <HeaderSearch />
        </header>
    );
};

export default HeaderMobileElectronic;
