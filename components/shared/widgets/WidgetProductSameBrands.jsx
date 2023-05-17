import React, { useEffect, useState } from 'react';
import { getProductsByCollectionHelper } from '~/utilities/strapi-fetch-data-helpers';
import Product from '~/components/elements/products/Product';
import { generateTempArray } from '~/utilities/common-helpers';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import ProductRepository from '~/repositories/ProductRepository';
import useTranslation from '~/config/lang';

const WidgetProductSameBrands = ({ collectionSlug, product }) => {
    const [productItems, setProductItems] = useState(null);
    const [loading, setLoading] = useState(true);
    const { Translate: t } = useTranslation();

    async function getProducts() {
        setLoading(true);
        const responseData = await ProductRepository.filterProductsOtherSellers(
            product.id
        );
        if (responseData) {
            setProductItems(responseData);
            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        } else {
            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        }
    }

    useEffect(() => {
        if (product) {
            console.log(product);
            getProducts();
        }
    }, [product]);

    // Views
    let productItemsView;
    if (!loading) {
        if (productItems && productItems.length > 0) {
            productItemsView = productItems.map((item) => (
                <Product product={item} key={item.id} />
            ));
        } else {
            productItemsView = <p>{t('no_products')}</p>;
        }
    } else {
        productItemsView = generateTempArray(3).map((item) => (
            <SkeletonProduct key={item} />
        ));
    }

    return (
        <aside className="widget widget_same-brand">
            <h3>{t('other_seller')}</h3>
            <div className="widget__content">{productItemsView}</div>
        </aside>
    );
};

export default WidgetProductSameBrands;
