import { useState } from 'react';
import {
    getProductsByCategoriesHelper,
    getProductsByCollectionHelper,
} from '~/utilities/strapi-fetch-data-helpers';
import ProductRepository from '~/repositories/ProductRepository';
import useTranslation from '~/config/lang';

export default function useGetProducts() {
    const [loading, setLoading] = useState(false);
    const [productItems, setProductItems] = useState(null);
    const [product, setProduct] = useState(null);
    const { Translate: t } = useTranslation();

    return {
        loading,
        productItems,
        product,
        setProductItems: (payload) => {
            setProductItems(payload);
        },

        setLoading: (payload) => {
            setLoading(payload);
        },

        getProductsByCollection: async (payload) => {
            setLoading(true);
            const responseData = await getProductsByCollectionHelper(payload);
            if (responseData) {
                setProductItems(responseData.items);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        filterProductsFeatures: async (payload) => {
            setLoading(true);
            const responseData = await getProductsByCollectionHelper(payload);
            if (responseData) {
                setProductItems(responseData.data);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getProductsByCategory: async (payload) => {
            setLoading(true);
            const responseData = await getProductsByCategoriesHelper(payload);
            if (responseData) {
                setProductItems(responseData.items);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getProducts: async (payload) => {
            setLoading(true);
            let responseData;
            if (payload) {
                responseData = await ProductRepository.getProducts(payload);
            } else {
                const queries = {
                    _limit: 12,
                };
                responseData = await ProductRepository.getProducts(queries);
            }
            if (responseData) {
                setProductItems(responseData);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getProductById: async (payload) => {
            setLoading(true);
            const responseData = await ProductRepository.getProductsById(
                payload
            );
            if (responseData) {
                setProduct(responseData);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getFilterProductsCategories: async (
            category_id,
            filter_str,
            vendor_id
        ) => {
            setLoading(true);
            const responseData =
                await ProductRepository.filterProductsCategories(
                    category_id,
                    filter_str,
                    vendor_id
                );
            if (responseData) {
                setProductItems(responseData);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },
    };
}
