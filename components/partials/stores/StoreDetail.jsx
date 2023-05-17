import React, { useEffect, useState } from 'react';
import ModuleStoreInformation from '~/components/partials/stores/modules/ModuleStoreInformation';
import ProductGroupByCarousel from '~/components/partials/product/ProductGroupByCarousel';
import ModuleStoreItems from '~/components/partials/stores/modules/ModuleStoreItems';
import StoreRepository from '~/repositories/StoreRepository';
import { useRouter } from 'next/router';
import GeneralService from '~/services/GeneralService';
import ProductRepository from '~/repositories/ProductRepository';
import ShopItems from '../shop/ShopItems';
import useTranslation from '~/config/lang';

const StoreDetail = () => {
    const Router = useRouter();
    const generalService = new GeneralService();
    const { slug } = Router.query;
    const [store, setStore] = useState(null);
    const [loading, setLoading] = useState(false);
    function formulateParams(vendor_id) {
        let params;

        params = {
            category: '',
            price_gt: '',
            price_lt: '',
            brand: '',
            q: '',
            page: 1,
            max_page: 20,
            sort_by: '',
            filter_vendor_id: vendor_id,
        };

        return params;
    }

    async function getStore(params) {
        setLoading(true);
        const responseData = await generalService.getVendor(params);
        if (responseData && responseData != 500) {
            let params = formulateParams(responseData.id);
            const products = await ProductRepository.filterProducts(params);
            responseData.products = products ? products.results : [];
            setStore(responseData);
            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        }
    }
    const { Translate: t } = useTranslation();

    useEffect(() => {
        getStore(slug);
    }, [slug]);
    //Views
    let storeProductsView;
    if (!loading) {
        if (store && store.products && store.products.length > 0) {
            storeProductsView = (
                <div className="ps-store-products">
                    <ProductGroupByCarousel
                        vendor_id={store.id}
                        title={t('best_seller_products')}
                    />
                    <ShopItems
                        products={store.products}
                        filter_vendor_id={store.id}
                        pageSizes={[8, 16, 32]}
                        pageSize={8}
                        store={true}
                    />
                </div>
            );
        } else {
            storeProductsView = <p>{t('no_products')}</p>;
        }
    } else {
        storeProductsView = <p>Loading...</p>;
    }
    return (
        <div className="ps-vendor-store">
            <div className="container">
                <div className="ps-section__container">
                    <div className="ps-section__left">
                        {store !== null && (
                            <ModuleStoreInformation
                                store={store && store !== null ? store : null}
                            />
                        )}
                    </div>
                    <div className="ps-section__right">
                        {/* <div className="ps-block--vendor-filter">
                            <div className="ps-block__left"></div>
                            <div className="ps-block__right">
                                <form
                                    className="ps-form--search"
                                    action="/"
                                    method="get">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Search in this shop"
                                    />
                                    <button>
                                        <i className="fa fa-search"></i>
                                    </button>
                                </form>
                            </div>
                        </div> */}
                        {storeProductsView}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreDetail;
