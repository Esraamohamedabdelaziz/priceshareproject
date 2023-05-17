import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import { getProductsByCategoriesHelper } from '~/utilities/strapi-fetch-data-helpers';
import Product from '~/components/elements/products/Product';
import { carouselStandard } from '~/utilities/carousel-helpers';
import useGetProducts from '~/hooks/useGetProducts';
import useTranslation from '~/config/lang';

const Market2ProductGroupByCategory = ({ categorySlug, title }) => {
    const { productItems, loading, getProductsByCategory } = useGetProducts();
    const { Translate: t } = useTranslation();

    useEffect(() => {
        getProductsByCategory(categorySlug);
    }, [categorySlug]);

    // Views
    let productItemsView;
    if (!loading) {
        if (productItems && productItems.length > 0) {
            const carouselItems = productItems.map((item) => {
                return <Product product={item} key={item.id} />;
            });
            productItemsView = (
                <Slider {...carouselStandard} className="ps-carousel outside">
                    {carouselItems}
                </Slider>
            );
        } else {
            productItemsView = <p>{t('no_products')}</p>;
        }
    } else {
        productItemsView = <p>Loading...</p>;
    }
    return (
        <section className="ps-product-list">
            <div className="container">
                <div className="ps-section__header">
                    <h3>{title}</h3>
                    <ul className="ps-section__links">
                        <li className="active">
                            <Link href="/shop">
                                <a>{t("new_arrivals")}</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop">
                                <a>{title: t("best_seller")}</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop">
                                <a>Must Popular</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop">
                                <a>{t('view_all')}</a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="ps-section__content">{productItemsView}</div>
            </div>
        </section>
    );
};
export default Market2ProductGroupByCategory;