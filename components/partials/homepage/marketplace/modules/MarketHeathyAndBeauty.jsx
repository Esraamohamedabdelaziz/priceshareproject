import React, { useEffect } from 'react';
import Link from 'next/link';

import Slider from 'react-slick';
import { carouselSingle } from '~/utilities/carousel-helpers';
import ProductSimple from '~/components/elements/products/ProductSimple';
import useGetProducts from '~/hooks/useGetProducts';
import useTranslation from '~/config/lang';

const MarketHeathyAndBeauty = ({ categorySlug }) => {
    const { productItems, loading, getProductsByCategory } = useGetProducts();
    const { Translate: t } = useTranslation();

    useEffect(() => {
        getProductsByCategory(categorySlug);
    }, [categorySlug]);

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
                    Health & <br /> Beauty
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
                        <Link href="/shop" as="/shop/women">
                            <a>Women</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/shop" as="/shop/men">
                            <a>Men</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/shop" as="/shop/girls">
                            <a>Girls</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/shop" as="/shop/boys">
                            <a>Boys</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/shop" as="/shop/baby">
                            <a>Baby</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/shop" as="/shop/sale-and-deal">
                            <a>Sales & Deals</a>
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
                            src="/static/img/slider/home-3/healthy-1.jpg"
                            alt="PriceShare"
                        />
                    </a>
                    <a>
                        <img
                            src="/static/img/slider/home-3/healthy-2.jpg"
                            alt="PriceShare"
                        />
                    </a>
                    <a>
                        <img
                            src="/static/img/slider/home-3/healthy-3.jpg"
                            alt="PriceShare"
                        />
                    </a>
                </Slider>
            </div>
            <div className="ps-block__product-box">{productItemsView}</div>
        </div>
    );
};

export default MarketHeathyAndBeauty;
