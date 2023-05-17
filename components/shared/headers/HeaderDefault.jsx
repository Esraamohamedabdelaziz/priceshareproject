import React, { useEffect } from 'react';
import Logo from '~/components/elements/common/Logo';
import SearchHeader from '~/components/shared/headers/modules/SearchHeader';
import NavigationDefault from '~/components/shared/navigation/NavigationDefault';
import HeaderActions from '~/components/shared/headers/modules/HeaderActions';
import { stickyHeader } from '~/utilities/common-helpers';
import MenuCategoriesDropdown from '~/components/shared/menus/MenuCategoriesDropdown';
import GeneralService from '../../../services/GeneralService';
import { useRouter } from 'next/router';
import stores from '~/public/static/data/stores';

const HeaderDefault = () => {
    const generalService = new GeneralService();
    const Router = useRouter();
    const { l } = Router.query;
    const { query } = Router;

    useEffect(() => {
        if (process.browser) {
            window.addEventListener('scroll', stickyHeader);
        }
        /*generalService.getStores().then((response) => {
            console.log(response);
        });*/
        let selected_store = {};
        if (process.browser) {
            if (query && l) {
                console.log(l);
                for (let i = 0; i < stores.stores.length; i++) {
                    // console.log(stores.stores[i]);
                    if (stores.stores[i].country === l) {
                        console.log('found');
                        selected_store = stores.stores[i];
                        break;
                    }
                }

                if (!selected_store) {
                    console.log('no slected store');
                    selected_store = stores.stores[1];
                }

                window.localStorage.removeItem('store');
                window.localStorage.setItem(
                    'store',
                    JSON.stringify(selected_store)
                );
            } else {
                // use default store, which is us
                selected_store = stores.stores[1];
                window.localStorage.removeItem('store');
                window.localStorage.setItem(
                    'store',
                    JSON.stringify(selected_store)
                );
            }
            console.log(selected_store);
        }
    }, [l]);

    return (
        <header
            className="header header--1"
            data-sticky="true"
            id="headerSticky"
        >
            <div className="header__top">
                <div className="ps-container">
                    <div className="header__left">
                        <Logo />
                        <MenuCategoriesDropdown />
                    </div>
                    <div className="header__center">
                        <SearchHeader />
                    </div>
                    <div className="header__right">
                        <HeaderActions />
                    </div>
                </div>
            </div>
            <NavigationDefault />
        </header>
    );
};

export default HeaderDefault;
