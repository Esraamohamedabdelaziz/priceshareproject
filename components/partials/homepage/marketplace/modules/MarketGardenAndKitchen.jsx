import React, { Component, useEffect, useState } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import { carouselSingle } from '~/utilities/carousel-helpers';
import { getProductsByCollectionHelper } from '~/utilities/strapi-fetch-data-helpers';
import ProductSimple from '~/components/elements/products/ProductSimple';
import useGetProducts from '~/hooks/useGetProducts';
import useTranslation from '~/config/lang';

const MarketGardenAndKitchen = ({ collectionSlug }) => {
    const { productItems, loading, getProductsByCollection } = useGetProducts();
    const { Translate: t } = useTranslation();

    useEffect(() => {
        getProductsByCollection(collectionSlug);
    }, [collectionSlug]);

    // Views
    let productItemsView;
    if (!loading) {
        if (productItems && productItems.length > 0) {
            productItemsView = productItems.map((item, index) => {
                if (index < 6) {
                    return <ProductSimple product={item} key={item.id} />;
                }
            });
        } else {
            productItemsView = <p>{t('no_products')}</p>;
        }
    } else {
        productItemsView = <p>Loading...</p>;
    }

    return (
        <div className="ps-block--products-of-category">
            <div className="ps-block__categories">
                <h3>
                    Home <br /> Garden & Kitchen
                </h3>
                <ul>
                    <li>
                        <Link href="/shop" as="/shop/best-seller">
                            <a>Best Seller</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/shop" as="/shop/new-arrivals">
                            <a>{t('new_arrivals')}</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/shop" as="/shop/furniture">
                            <a>Furniture</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/shop" as="/shop/home-decor">
                            <a>Home Decor</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/shop" as="/shop/cookware">
                            <a>Cookware</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/shop" as="/shop/utensils-and-gadget">
                            <a>Utensils & Gadget</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/shop" as="/shop/garden-tools">
                            <a>Garden Tools</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/shop" as="/shop/acessesories">
                            <a>Acessesories</a>
                        </Link>
                    </li>
                </ul>
                <Link href="/shop">
                    <a className="ps-block__more-link">{t('view_all')}</a>
                </Link>
            </div>
            <div className="ps-block__slider">
                <Slider {...carouselSingle} className="ps-carousel">
                    <a>
                        <img
                            src="/static/img/slider/home-3/kitchen-1.jpg"
                            alt="PriceShare"
                        />
                    </a>
                    <a>
                        <img
                            src="/static/img/slider/home-3/kitchen-2.jpg"
                            alt="PriceShare"
                        />
                    </a>
                    <a>
                        <img
                            src="/static/img/slider/home-3/kitchen-3.jpg"
                            alt="PriceShare"
                        />
                    </a>
                </Slider>
            </div>
            <div className="ps-block__product-box">{productItemsView}</div>
        </div>
    );
};
export default MarketGardenAndKitchen;
