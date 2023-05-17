import React, { useEffect, useRef, useState } from 'react';
// import CurrencyDropdown from './modules/CurrencyDropdown';
import Link from 'next/link';
import LanguageSwicher from './modules/LanguageSwicher';
import MobileHeaderActions from './modules/MobileHeaderActions';
import ProductRepository from '~/repositories/ProductRepository';
import ProductSearchResult from '~/components/elements/products/ProductSearchResult';
import { useRouter } from 'next/router';
import { Spin } from 'antd';
import useTranslation from '~/config/lang';

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

const HeaderSearch = () => {
    const [keyword, setKeyword] = useState('');
    const [resultItems, setResultItems] = useState(null);
    const [loading, setLoading] = useState(false);
    const debouncedSearchTerm = useDebounce(keyword, 300);
    const inputEl = useRef(null);
    const [isSearch, setIsSearch] = useState(false);
    const { Translate: t } = useTranslation();

    const Router = useRouter();
    const { page } = Router.query;
    function handleSubmit(e) {
        e.preventDefault();
        handleClearKeyword();

        window.location.href = `/shop?q=${keyword}`;
    }

    function handleClearKeyword() {
        setKeyword('');
        setIsSearch(false);
        setLoading(false);
    }
    function formulateParams(queries) {
        let params;
        // let catList;
        // let brandsList;
        // if (category) {
        //   catList = category.split(',')
        // }
        // if (brands) {
        //   brandsList = brands.split(',')
        // }

        params = {
            category: '',
            price_gt: '',
            price_lt: '',
            brand: '',
            q: queries.q ? queries.q : '',
            top_match: queries.top_match ? queries.top_match : false,
            page: page ? page : 1,
            max_page: 20,
            sort_by: '',
        };

        return params;
    }

    useEffect(() => {
        if (debouncedSearchTerm) {
            setLoading(true);
            if (keyword) {
                const queries = {
                    top_match: true,
                    q: keyword,
                };
                let params;
                params = formulateParams(queries);
                const products = ProductRepository.filterProducts(params);
                products.then((result) => {
                    console.log(result);
                    setLoading(false);
                    setResultItems(result ? result.results : []);
                    setIsSearch(true);
                });
            } else {
                setIsSearch(false);
                setKeyword('');
            }
            if (loading) {
                setIsSearch(false);
            }
        } else {
            setLoading(false);
            setIsSearch(false);
        }
    }, [debouncedSearchTerm]);

    // Views
    let productItemsView,
        clearTextView,
        selectOptionView,
        loadingView,
        loadMoreView;
    if (!loading) {
        if (resultItems && resultItems.length > 0) {
            if (resultItems.length > 5) {
                loadMoreView = (
                    <div className="ps-panel__footer text-center">
                        <Link href="/search">
                            <a>{t('see_results')}</a>
                        </Link>
                    </div>
                );
            }
            productItemsView = resultItems.map((product) => (
                <ProductSearchResult product={product} key={product.id} />
            ));
        } else {
            productItemsView = <p>{t('no_products')}</p>;
        }
        if (keyword !== '') {
            clearTextView = (
                <span className="ps-form__action" onClick={handleClearKeyword}>
                    <i className="icon icon-cross2"></i>
                </span>
            );
        }
    } else {
        loadingView = (
            <span className="ps-form__action">
                <Spin size="small" />
            </span>
        );
    }
    return (
        <div className="ps-search--mobile">
            <form
                className="ps-form--search-mobile"
                action="/"
                method="get"
                onSubmit={(e) => handleSubmit(e)}
            >
                <div className="form-group--nest">
                    <input
                        className="form-control"
                        type="text"
                        placeholder={t('search_placeholder')}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <button>
                        <i className="icon-magnifier"></i>
                    </button>
                </div>
            </form>
            {keyword && (
                <div
                    className={`bg-white pt-3 ps-panel--search-result${
                        isSearch ? ' active ' : ''
                    }`}
                >
                    <div className="ps-panel__content">{productItemsView}</div>
                    {loadMoreView}
                </div>
            )}
        </div>
    );
};

export default HeaderSearch;
