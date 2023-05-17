import React, { Component } from 'react';
import Link from 'next/link';
import { notification } from 'antd';
import Menu from '../../elements/menu/Menu';

import menuData from '../../../public/static/data/menu';
// import CurrencyDropdown from '../headers/modules/CurrencyDropdown';
import LanguageSwicher from '../headers/modules/LanguageSwicher';
import MenuCategoriesDropdown from '~/components/shared/menus/MenuCategoriesDropdown';
import LangSwicher from '../headers/modules/LangSwicher';

import useTranslation from '~/config/lang';

const NavigationDefault = () => {
    const { Translate: t } = useTranslation();

    return (
        <nav className="navigation makeItFlexWithDir">
            <div className="ps-container">
                <div className="navigation__left">
                    <MenuCategoriesDropdown />
                </div>
                <div className="navigation__right">
                    <Menu
                        source={menuData.menuPrimary.menu_1}
                        className="menu"
                    />
                    <ul className="navigation__extra makeItFlex">
                        <li>
                            <Link href="/vendor/become-a-vendor">
                                <a
                                    style={{
                                        color: 'white',
                                        textTransform: 'Uppercase',
                                        fontSize: '90%',
                                    }}
                                >
                                    {t('sell_on_priceshare')}
                                </a>
                            </Link>
                        </li>
                        {/* <li>
                                <Link href="/account/order-tracking">
                                    <a
                                        style={{
                                            color: 'white',
                                            textTransform: 'Uppercase',
                                        }}>
                                        Tract your order
                                    </a>
                                </Link>
                            </li> */}
                        {/* <li>
                                <CurrencyDropdown />
                            </li> */}
                        <li>
                            <LangSwicher />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavigationDefault;
