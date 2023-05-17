import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import { generateTempArray } from '~/utilities/common-helpers';
import { ProductGroupWithCarousel } from '~/components/partials/product/ProductGroupWithCarousel';
import useGetProducts from '~/hooks/useGetProducts';
import ProductRepository from '../../../../repositories/ProductRepository';
import useTranslation from '~/config/lang';

const HomeDefaultProductListing = ({ collectionSlug, title, category_id }) => {
    const [currentCollection, setCurrentCollection] = useState('new_arrivals');
    // const { productItems, loading, getProductsByCollection } = useGetProducts();
    const [productItems, setProductItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const { Translate: t } = useTranslation();

    const sectionLinks = [
        {
            title: t('new_arrivals'),
            name: 'new_arrivals',
            slug: collectionSlug,
            category_id: 1,
        },
        {
            title: t('best_seller'),
            name: 'best_seller',
            slug: 'fullwidth-clothing-best-sellers',
            category_id: 1,
        },
        {
            title: t('most_popular'),
            name: 'most_popular',
            slug: 'fullwidth-clothing-most-popular',
            category_id: 1,
        },
    ];

    function handleChangeTab(e, tab) {
        e.preventDefault();
        setCurrentCollection(tab.name);
        // getProductsByCollection(tab.slug);
        ProductRepository.filterProductsCategories(category_id, tab.name).then(
            (response) => {
                setProductItems(response);
            }
        );
    }

    useEffect(() => {
        setLoading(true);
        ProductRepository.filterProductsCategories(
            category_id,
            currentCollection
        ).then((response) => {
            setProductItems(response);
            setLoading(false);
        });
    }, [collectionSlug]);

    const sectionLinksView = sectionLinks.map((link) => (
        <li
            className={currentCollection === link.name ? 'active' : ''}
            key={link.name}
        >
            <a href="#" onClick={(e) => handleChangeTab(e, link)}>
                {link.title}
            </a>
        </li>
    ));

    // views
    let productItemsView;
    if (!loading) {
        if (productItems && productItems.length > 0) {
            productItemsView = (
                <ProductGroupWithCarousel
                    products={productItems}
                    type="fullwidth"
                />
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
        <div className="ps-product-list">
            <div className="ps-container">
                <div className="ps-section__header">
                    <h3>{title}</h3>
                    <ul className="ps-section__links">
                        {sectionLinksView}
                        <li>
                            <Link href={`/shop`}>
                                <a>{t('view_all')}</a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="ps-section__content">{productItemsView}</div>
            </div>
        </div>
    );
};

export default HomeDefaultProductListing;
