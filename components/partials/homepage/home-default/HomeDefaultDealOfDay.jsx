import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import { carouselFullwidth } from '~/utilities/carousel-helpers';
import CountDownSimple from '~/components/elements/CountDownSimple';
import ProductDealOfDay from '~/components/elements/products/ProductDealOfDay';
import { generateTempArray } from '~/utilities/common-helpers';
import useGetProducts from '~/hooks/useGetProducts';
import ProductRepository from '~/repositories/ProductRepository';
import useTranslation from '~/config/lang';

const HomeDefaultDealOfDay = ({ collectionSlug }) => {
    // const { productItems, loading, getProductsByCollection } = useGetProducts();
    const [productItems, setProductItems] = useState([]);
    const { Translate: t } = useTranslation();

    const [loading, setLoading] = useState(null);

    async function getProducts() {
        setProductItems([]);
        // console.log(product)
        setLoading(true);
        const responseData = await ProductRepository.filterProductsFeatured();
        if (responseData) {
            setProductItems(responseData);
            console.log(responseData);
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
        getProducts();
    }, []);

    // Views
    let productItemsView;
    if (!loading) {
        if (productItems && productItems.length > 0) {
            const slideItems = productItems.map((item) => (
                <ProductDealOfDay product={item} key={item.id} />
            ));
            productItemsView = (
                <Slider {...carouselFullwidth} className="ps-carousel outside">
                    {slideItems}
                </Slider>
            );
        } else {
            productItemsView = <p>{t('no_products')}</p>;
        }
    } else {
        const skeletons = generateTempArray(6).map((item) => (
            <div className="col-xl-2 col-lg-3 col-sm-3 col-6" key={item}>
                <SkeletonProduct />
            </div>
        ));
        productItemsView = <div className="row">{skeletons}</div>;
    }

    return (
        <div className="ps-deal-of-day">
            <div className="ps-container">
                <div className="ps-section__header">
                    <div className="ps-block--countdown-deal">
                        <div className="ps-block__left">
                            <h3
                                style={{
                                    color: 'black',
                                }}
                            >
                                {t('featured_products')}
                            </h3>
                        </div>
                        <div className="ps-block__right">
                            <figure>
                                <figcaption>{t('end_in')}</figcaption>
                                <CountDownSimple
                                    timeTillDate="12 31 2021, 6:00 am"
                                    timeFormat="MM DD YYYY, h:mm a"
                                />
                            </figure>
                        </div>
                    </div>
                    <Link href="/shop">
                        <a>{t('view_all')}</a>
                    </Link>
                </div>
                <div className="ps-section__content">{productItemsView}</div>
            </div>
        </div>
    );
};

export default HomeDefaultDealOfDay;
