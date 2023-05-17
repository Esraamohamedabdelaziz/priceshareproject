import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Spin } from 'antd';
import ProductRepository from '~/repositories/ProductRepository';
import ProductSearchResult from '~/components/elements/products/ProductSearchResult';
import useTranslation from '~/config/lang';

// const {query} = Router;

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

const SearchHeader = () => {
    const inputEl = useRef(null);
    const [isSearch, setIsSearch] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [resultItems, setResultItems] = useState(null);
    const [loading, setLoading] = useState(false);
    const debouncedSearchTerm = useDebounce(keyword, 300);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState([]);

    const { Translate: t } = useTranslation();

    const Router = useRouter();
    const { page } = Router.query;

    function handleClearKeyword() {
        setKeyword('');
        setIsSearch(false);
        setLoading(false);
    }

    function handleSubmit(e) {
        e.preventDefault();
        window.location.href = `/shop?q=${keyword}`;
    }

    function handleChangeCategory(e) {
        e.preventDefault();
        console.log(e.target.value);
        setCategory(e.target.value);
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
            category: category ? [JSON.stringify(category)] : '',
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

    async function getCategories() {
        setLoading(true);
        const responseData = await ProductRepository.getCategories();
        if (responseData) {
            setCategories(responseData.results);
            console.log(categories);
            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        }
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
        getCategories();
    }, [debouncedSearchTerm, category]);

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

    if (categories) {
        selectOptionView = categories.map((option) => (
            <option value={option.id} key={option.id}>
                {Router.locale == 'ar' ? option.name_ar : option.name}
            </option>
        ));
    }

    return (
        <form
            className="ps-form--quick-search"
            method="get"
            action="/"
            onSubmit={handleSubmit}
        >
            <div className="ps-form__categories">
                <select
                    className="form-control"
                    style={{
                        color: 'black',
                    }}
                    onChange={(e) => handleChangeCategory(e)}
                >
                    <option value={''} key={0}>
                        {t('all')}
                    </option>
                    {selectOptionView}
                </select>
            </div>
            <div className="ps-form__input">
                <input
                    ref={inputEl}
                    className="form-control"
                    type="text"
                    value={keyword}
                    placeholder={t('search_placeholder')}
                    onChange={(e) => setKeyword(e.target.value)}
                    style={{ color: '#000' }}
                />
                {clearTextView}
                {loadingView}
            </div>
            <button onClick={handleSubmit} style={{ backgroundColor: '#000' }}>
                {t('search_submit')}
            </button>
            <div
                className={`ps-panel--search-result${
                    isSearch ? ' active ' : ''
                }`}
            >
                <div className="ps-panel__content">{productItemsView}</div>
                {loadMoreView}
            </div>
        </form>
    );
};

export default SearchHeader;
