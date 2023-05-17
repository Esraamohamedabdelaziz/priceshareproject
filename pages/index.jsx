import React, { useEffect, useState } from 'react';
import i18next from 'i18next';
import './../config/i18n/i18n';
import SiteFeatures from '~/components/partials/homepage/home-default/SiteFeatures';
import HomeAdsColumns from '~/components/partials/homepage/home-default/HomeAdsColumns';
import HomeAds from '~/components/partials/homepage/home-default/HomeAds';
import DownLoadApp from '~/components/partials/commons/DownLoadApp';
import NewArrivals from '~/components/partials/homepage/home-default/NewArrivals';
import Newletters from '~/components/partials/commons/Newletters';
import HomeDefaultDealOfDay from '~/components/partials/homepage/home-default/HomeDefaultDealOfDay';
import HomeDefaultTopCategories from '~/components/partials/homepage/home-default/HomeDefaultTopCategories';
import HomeDefaultProductListing from '~/components/partials/homepage/home-default/HomeDefaultProductListing';
import HomeDefaultBanner from '~/components/partials/homepage/home-default/HomeDefaultBanner';
import PageContainer from '~/components/layouts/PageContainer';
import ProductRepository from '~/repositories/ProductRepository';
import useTranslation from '~/config/lang';
import GeneralService from '~/services/GeneralService';
import { Spin } from 'antd';

const HomepageDefaultPage = () => {
    const { Translate: t } = useTranslation();
    const [isLoading, setLoading] = useState(false);
    const [bannerItems, setBannerItems] = useState(null);
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

    console.log(bannerItems, 'bannerItemsbannerItems');
    // if (isLoading)
    //     return (
    //         <div
    //             style={{
    //                 width: '100vw',
    //                 height: '100vh',
    //                 display: 'flex',
    //                 alignItems: 'center',
    //                 justifyContent: 'center',
    //             }}
    //         >
    //             <Spin />
    //         </div>
    //     );
    return (
        <PageContainer title="The New Shopping Experience">
            <main
                id="homepage-1"
                style={{ maxWidth: '1650px', margin: '0 auto' }}
            >
                <HomeDefaultBanner bannerItems={bannerItems} />
                <SiteFeatures />
                <HomeDefaultDealOfDay collectionSlug="deal-of-the-day" />
                <HomeAdsColumns bannerItems={bannerItems} />
                <HomeDefaultTopCategories />
                <HomeDefaultProductListing
                    collectionSlug="consumer-electronics"
                    title={t('consumer_electronics')}
                    category_id="1"
                />
                <HomeDefaultProductListing
                    collectionSlug="clothings"
                    title={t('clothings')}
                    category_id="1"
                />
                <HomeDefaultProductListing
                    collectionSlug="garden-and-kitchen"
                    title={t('garden_kitchen')}
                    category_id="1"
                />
                <HomeAds bannerItems={bannerItems} />
                <DownLoadApp />
                <NewArrivals collectionSlug="new-arrivals-products" />
                {/* <Newletters /> */}
            </main>
        </PageContainer>
    );
};

export default HomepageDefaultPage;
