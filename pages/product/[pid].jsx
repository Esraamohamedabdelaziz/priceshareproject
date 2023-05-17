import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductRepository from '~/repositories/ProductRepository';
import SkeletonProductDetail from '~/components/elements/skeletons/SkeletonProductDetail';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ProductWidgets from '~/components/partials/product/ProductWidgets';
import ProductDetailFullwidth from '~/components/elements/detail/ProductDetailFullwidth';
import CustomerBought from '~/components/partials/product/CustomerBought';
import RelatedProduct from '~/components/partials/product/RelatedProduct';
import HeaderProduct from '~/components/shared/headers/HeaderProduct';
import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import HeaderMobileProduct from '~/components/shared/header-mobile/HeaderMobileProduct';
import useTranslation from '~/config/lang';

const ProductDefaultPage = () => {
    const router = useRouter();
    const { pid } = router.query;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);

    const getProduct = async () => {
        try {
            setLoading(true);
            const responseData = await ProductRepository.getProductsById(pid);
            setTimeout(() => {
                setProduct(responseData);
                setLoading(false);
            }, 250);
            //          if (responseData) {
            //     setProduct(responseData);
            //     setTimeout(
            //          ()=>{
            //             setLoading(false);
            //         },
            //         250
            //     );
            // }
        } catch (error) {}
    };

    useEffect(() => {
        if (pid) getProduct(pid);
    }, [pid]);
    const { Translate: t } = useTranslation();

    console.log(product, 'prrrp');
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Shop',
            url: '/shop',
        },
        {
            text: product?.name
                ? router.locale == 'ar'
                    ? product.name_ar
                    : product.name
                : 'Loading...',
        },
    ];
    // Views
    let productView, headerView;
    if (!loading) {
        if (product) {
            productView = <ProductDetailFullwidth product={product} />;
            headerView = (
                <>
                    <HeaderProduct product={product} />
                    <HeaderMobileProduct />
                </>
            );
        } else {
            headerView = (
                <>
                    <HeaderDefault />
                    <HeaderMobileProduct />
                </>
            );
        }
    } else {
        productView = <SkeletonProductDetail />;
    }

    return (
        <PageContainer
            header={headerView}
            title={
                product
                    ? router.locale == 'ar'
                        ? product.name_ar
                        : product.name
                    : 'Loading...'
            }
        >
            <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
            <div
                className="ps-page--product"
                style={{ maxWidth: '1650px', margin: '0 auto' }}
            >
                <div className="ps-container">
                    <div className="ps-page__container">
                        <div className="ps-page__left">{productView}</div>
                        <div className="ps-page__right">
                            <ProductWidgets product={product} />
                        </div>
                    </div>

                    <CustomerBought
                        layout="fullwidth"
                        collectionSlug="deal-of-the-day"
                        product={product}
                    />
                    <RelatedProduct
                        collectionSlug="shop-recommend-items"
                        product={product}
                    />
                </div>
            </div>
            {/* <Newletters /> */}
        </PageContainer>
    );
};

export default ProductDefaultPage;
