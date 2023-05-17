import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductHorizontal from '~/components/elements/products/ProductHorizontal';
import useGetProducts from '~/hooks/useGetProducts';
import ProductRepository from '../../../../repositories/ProductRepository';
import useTranslation from '~/config/lang';
import { pushQuery } from '~/utilities';
import { useRouter } from 'next/router';
import menuData from '~/public/static/data/menu';
import { getTextLang } from '~/components/shared/panel/PanelMenu';

const NewArrivals = ({ collectionSlug }) => {
    // const { productItems, loading, getProductsByCollection } = useGetProducts();
    const [productItems, setProductItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const { Translate: t } = useTranslation();
    const router = useRouter();
    const productCategories = menuData.product_categories;

    useEffect(() => {
        // getProductsByCollection(collectionSlug);
        setLoading(true);
        ProductRepository.filterProductsNewArrivals(selectedCategory).then(
            (responseData) => {
                setProductItems(responseData);
                setLoading(false);
            }
        );
    }, [collectionSlug, selectedCategory]);

    // Views
    let productItemView;
    if (!loading) {
        if (productItems && productItems.length > 0) {
            productItemView = productItems.map((item) => (
                <div
                    className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 "
                    key={item.id}
                >
                    <ProductHorizontal product={item} />
                </div>
            ));
        } else {
            productItemView = <p>{t('no_products')}</p>;
        }
    } else {
        productItemView = <p>Loading...</p>;
    }
    return (
        <div className="ps-product-list ps-new-arrivals">
            <div className="ps-container">
                <div className="ps-section__header">
                    <h3> {t('new_arrivals')}</h3>
                    <ul className="ps-section__links">
                        {productCategories?.slice(1, 8)?.map((category) => {
                            return (
                                <li>
                                    <>
                                        <a
                                            onClick={() => {
                                                setSelectedCategory(
                                                    category.id
                                                );
                                                // pushQuery(router, {category:category.id})
                                            }}
                                        >
                                            {getTextLang(category)}
                                        </a>
                                    </>
                                </li>
                            );
                        })}

                        {/* <li>
                            <>
                                <a>{t('view_all')}</a>
                            </>
                        </li> */}
                    </ul>
                </div>
                <div className="ps-section__content">
                    <div className="row">{productItemView}</div>
                </div>
            </div>
        </div>
    );
};

export default NewArrivals;
