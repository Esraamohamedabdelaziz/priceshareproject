import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import {
    carouselFullwidth,
    carouselStandard,
} from '~/utilities/carousel-helpers';
import Product from '~/components/elements/products/Product';
// import { getProductsByCollectionHelper } from '~/utilities/strapi-fetch-data-helpers';
import ProductRepository from '~/repositories/ProductRepository';
import useTranslation from '~/config/lang';

const CustomerBought = ({ collectionSlug, boxed, layout, product }) => {
    const [productItems, setProductItems] = useState(null);
    const [loading, setLoading] = useState(true);
    const { Translate: t } = useTranslation();

    async function getProducts() {
        // console.log(product)
        setLoading(true);
        if (product) {
            const responseData =
                await ProductRepository.filterProductsAlsoBought(
                    product ? product.id : ''
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
    }

    useEffect(() => {
        // console.log(product);
        getProducts();
    }, [product]);

    // Views
    let carouselView;
    if (!loading) {
        if (productItems) {
            if ((layout = 'fullwidth')) {
                carouselView = (
                    <Slider
                        {...carouselFullwidth}
                        className="ps-carousel outside"
                    >
                        {productItems.map((item, index) => {
                            if (index < 8) {
                                return <Product product={item} key={item.id} />;
                            }
                        })}
                    </Slider>
                );
            } else {
                carouselView = (
                    <Slider
                        {...carouselStandard}
                        className="ps-carousel outside"
                    >
                        {productItems.map((item, index) => {
                            return <Product product={item} key={item.id} />;
                        })}
                    </Slider>
                );
            }
        } else {
            carouselView = <p>{t('no_products')}</p>;
        }
    } else {
        carouselView = <p>Loading...</p>;
    }

    return (
        <div
            className={`ps-section--default ps-customer-bought ${
                boxed === true ? 'boxed' : ''
            }`}
        >
            <div className="ps-section__header">
                <h3
                    style={{
                        color: 'black',
                    }}
                >
                    {t('customer_bought')}
                </h3>
            </div>
            <div className="ps-section__content">{carouselView}</div>
        </div>
    );
};

export default CustomerBought;
