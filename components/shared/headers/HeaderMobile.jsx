import React, { useEffect, useRef, useState } from 'react';
// import CurrencyDropdown from './modules/CurrencyDropdown';
import Link from 'next/link';
import LanguageSwicher from './modules/LanguageSwicher';
import MobileHeaderActions from './modules/MobileHeaderActions';
import ProductRepository from '~/repositories/ProductRepository';
import ProductSearchResult from '~/components/elements/products/ProductSearchResult';
import { useRouter } from 'next/router';
import { Spin } from 'antd';
import HeaderSearch from './HeaderSearch';
import useTranslation from '~/config/lang';

const HeaderMobile = () => {
    const Router = useRouter();
    const { Translate: t } = useTranslation();

    // Views

    return (
        <header className="header header--mobile">
            <div
                className="header__top"
                style={{
                    background: 'black',
                }}
            >
                <div className="header__left">
                    <p>The new shopping experience!</p>
                </div>
                <div className="header__right">
                    <ul className="navigation__extra">
                        <li>
                            <Link href="/vendor/become-a-vendor">
                                <a
                                    style={{
                                        color: 'white',
                                    }}
                                >
                                    {t('sell_on_priceshare')}
                                </a>
                            </Link>
                        </li>
                        {/* <li>
                                <CurrencyDropdown />
                            </li> */}
                        <li>
                            <LanguageSwicher />
                        </li>
                    </ul>
                </div>
            </div>
            <div
                className="navigation--mobile"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: '#e32017',
                }}
            >
                <div className="navigation__left">
                    <Link href="/">
                        <a className="ps-logo">
                            <img
                                src="/static/img/logo_light.png"
                                alt="PriceShare"
                                style={{
                                    width: '60px',
                                }}
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

export default HeaderMobile;
