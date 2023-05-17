import React, { useEffect, useState } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ShopItems from '~/components/partials/shop/ShopItems';
import ProductGroupByCarousel from '~/components/partials/product/ProductGroupByCarousel';
import ShopCategories from '~/components/partials/shop/ShopCategories';
import ShopBrands from '~/components/partials/shop/ShopBrands';
import ShopBanner from '~/components/partials/shop/ShopBanner';
import WidgetShopCategories from '~/components/shared/widgets/WidgetShopCategories';
import WidgetShopBrands from '~/components/shared/widgets/WidgetShopBrands';
import WidgetShopFilterByPriceRange from '~/components/shared/widgets/WidgetShopFilterByPriceRange';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import useTranslation from '~/config/lang';
import GeneralService from '~/services/GeneralService';
import { Spin } from 'antd';

const ShopDefaultPage = (props) => {
    const { Translate: t } = useTranslation();
    const [bannerItems, setBannerItems] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const generalService = new GeneralService();
    async function getBannerItems(params) {
        setLoading(true);
        try {
            const responseData = await generalService.getBanners(params);
            setBannerItems(responseData);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getBannerItems();
    }, []);
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: t('shop_default'),
        },
    ];
    //    if (isLoading)
    //         return (
    //             <div
    //                 style={{
    //                     width: '100vw',
    //                     height: '100vh',
    //                     display: 'flex',
    //                     alignItems: 'center',
    //                     justifyContent: 'center',
    //                 }}
    //             >
    //                 <Spin />
    //             </div>
    //         );
    return (
        <PageContainer title="Shop">
            <div className="ps-page--shop">
                <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
                <div
                    className="ps-container"
                    style={{ maxWidth: '1650px', margin: '0 auto' }}
                >
                    <ShopBanner bannerItems={bannerItems} />

                    <div className="ps-layout--shop">
                        <div className="ps-layout__left">
                            <WidgetShopCategories query={props.query} />
                            {/* <WidgetShopBrands /> */}
                            {/* <WidgetShopFilterByPriceRange /> */}
                        </div>
                        <div className="ps-layout__right">
                            {/* <ProductGroupByCarousel
                                collectionSlug="shop-best-seller-items"
                                title="Best Sale Items"
                            /> */}
                            {/* <ProductGroupByCarousel
                                collectionSlug="shop-recommend-items"
                                title="Recommended Items"
                            /> */}
                            <ShopItems
                                columns={6}
                                pageSize={12}
                                pageSizes={[12, 18, 36, 72]}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* <Newletters /> */}
        </PageContainer>
    );
};

export async function getServerSideProps(context) {
    console.log(context.query, 'context');
    return {
        props: { query: context.query }, // will be passed to the page component as props
    };
}
export default ShopDefaultPage;
