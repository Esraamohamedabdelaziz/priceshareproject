import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import Product from '~/components/elements/products/Product';
import ProductWide from '~/components/elements/products/ProductWide';
import ProductRepository from '~/repositories/ProductRepository';
import ModuleShopSortBy from '~/components/partials/shop/modules/ModuleShopSortBy';
import { useRouter } from 'next/router';
import { generateTempArray } from '~/utilities/common-helpers';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import useGetProducts from '~/hooks/useGetProducts';
import useTranslation from '~/config/lang';
import { pushQuery } from '~/utilities';

const ShopItems = ({
    columns = 4,
    pageSize = 12,
    pageSizes,
    filter_vendor_id = '',
}) => {
    const Router = useRouter();
    const { brands, category, price_gt, price_lt, q } = Router.query;
    const { page } = Router.query;
    const { query } = Router;
    const [productItems, setProductItems] = useState(null);
    const [listView, setListView] = useState(true);
    const [total, setTotal] = useState(0);
    const [maxPage, setMaxPage] = useState('');
    const [currentPage, setCurrentPage] = useState(pageSize);
    const [classes, setClasses] = useState(
        'col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6'
    );

    const [loading, setLoading] = useState(false);

    // const { productItems } = useGetProducts();

    function handleChangeViewMode(e) {
        e.preventDefault();
        setListView(!listView);
    }

    console.log(Router, 'RouterRouter');
    function handlePagination(page, pageSize) {
        setCurrentPage(pageSize);
        console.log(page, pageSize, 'pageSize');
        // Router.push(`${Router.asPath}`,{
        //     page
        // });
        pushQuery(Router, { page });
    }

    function handleChangeSortBy(e) {
        e.preventDefault();
        console.log(e.target.value);
        let params;
        if (query) {
            params = formulateParams(e.target.value);
            getProducts(params);
        }
    }

    /*async function getTotalRecords(params) {
        const responseData = await ProductRepository.getTotalRecords();
        if (responseData) {
            setTotal(responseData);
        }
    }*/

    function handleSetColumns() {
        switch (columns) {
            case 2:
                setClasses('col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6');
                return 3;
                break;
            case 4:
                setClasses('col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6');
                return 4;
                break;
            case 6:
                setClasses('col-xl-2 col-lg-4 col-md-6 col-sm-6 col-6');
                return 6;
                break;

            default:
                setClasses('col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6');
        }
    }

    function formulateParams(sortBy) {
        let params;
        let catList;
        let brandsList;
        if (category) {
            catList = category.split(',');
        }
        if (brands) {
            brandsList = brands.split(',');
        }

        params = {
            category: catList ? JSON.stringify(catList) : '',
            price_gt: price_gt ? price_gt : '',
            price_lt: price_lt ? price_lt : '',
            brand: brandsList ? JSON.stringify(brandsList) : '',
            q: q ? q : '',
            page: page ? page : 1,
            max_page: currentPage ? currentPage : 20,
            sort_by: sortBy ? sortBy : '',
            filter_vendor_id: filter_vendor_id ? filter_vendor_id : '',
        };

        return params;
    }

    useEffect(() => {
        let params;
        if (query) {
            params = formulateParams('');

            //     if (query.page) {
            //         params = {
            //             _start: page * pageSize,
            //             _limit: pageSize,
            //         };
            //     } else {
            //         params = query;
            //         params._limit = pageSize;
            //     }
            // } else {
            //     params = {
            //         _limit: pageSize,
            //     };
        }
        // getTotalRecords();
        getProducts(params);
        handleSetColumns();
    }, [query]);

    async function getProducts(payload) {
        console.log(payload);
        setLoading(true);
        let responseData;
        setProductItems([]);
        if (payload) {
            responseData = await ProductRepository.filterProducts(payload);
        } // else {
        //  const queries = {
        //      _limit: 12,
        //  };
        // responseData = await ProductRepository.getProducts(queries);
        // }
        console.log(responseData);
        if (responseData) {
            setProductItems(responseData.results);
            setTotal(responseData.count);
            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        } else {
            setLoading(false);
        }
    }
    const { Translate: t } = useTranslation();

    // Views
    let productItemsView;
    if (!loading) {
        if (productItems && productItems.length > 0) {
            if (listView) {
                const items = productItems.map((item) => (
                    <div className={classes} key={item.id}>
                        <Product product={item} />
                    </div>
                ));
                productItemsView = (
                    <div className="ps-shop-items">
                        <div className="row">{items}</div>
                    </div>
                );
            } else {
                productItemsView = productItems.map((item) => (
                    <ProductWide product={item} />
                ));
            }
        } else {
            productItemsView = <p>{t('no_products')}</p>;
        }
    } else {
        const skeletonItems = generateTempArray(12).map((item) => (
            <div className={classes} key={item}>
                <SkeletonProduct />
            </div>
        ));
        productItemsView = <div className="row">{skeletonItems}</div>;
    }

    return (
        <div className="ps-shopping">
            <div className="ps-shopping__header">
                <p>
                    <strong className="mr-2">{total}</strong>
                    {t('products_found')}
                </p>
                <div className="ps-shopping__actions">
                    <select
                        className="ps-select form-control"
                        data-placeholder="Sort Items"
                        onChange={(e) => handleChangeSortBy(e)}
                    >
                        <option value="latest">{t('sort_latest')}</option>
                        <option value="ph">{t('sort_price_high_low')}</option>
                        <option value="pl">{t('sort_price_low_high')}</option>
                    </select>
                    <div className="ps-shopping__view">
                        <p>{t('view')}</p>
                        <ul className="ps-tab-list">
                            <li className={listView === true ? 'active' : ''}>
                                <a
                                    href="#"
                                    onClick={(e) => handleChangeViewMode(e)}
                                >
                                    <i className="icon-grid"></i>
                                </a>
                            </li>
                            <li className={listView !== true ? 'active' : ''}>
                                <a
                                    href="#"
                                    onClick={(e) => handleChangeViewMode(e)}
                                >
                                    <i className="icon-list4"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="ps-shopping__content">{productItemsView}</div>
            <div className="ps-shopping__footer text-center">
                <div className="ps-pagination">
                    <Pagination
                        total={total - 1}
                        pageSize={currentPage}
                        pageSizeOptions={
                            pageSizes ? pageSizes : [12, 18, 36, 72]
                        }
                        responsive={true}
                        showSizeChanger={true}
                        current={page !== undefined ? parseInt(page) : 1}
                        onChange={handlePagination}
                    />
                </div>
            </div>
        </div>
    );
};

export default ShopItems;
