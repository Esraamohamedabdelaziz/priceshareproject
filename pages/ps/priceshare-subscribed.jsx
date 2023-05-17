import React, { useEffect } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import Newsletters from '~/components/partials/commons/Newletters';
import PriceShareSubscribed from '~/components/partials/priceshare/PriceShareSubscribed';
import useTranslation from '~/config/lang';

const PriceShareURLCheckPage = () => {
    const { Translate: t } = useTranslation();
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'PriceShare Subscription Complete',
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="Packages">
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} />
            </div>
            <PriceShareSubscribed />
            {/* <Newsletters layout="container"/> */}
        </PageContainer>
    );
};

export default PriceShareURLCheckPage;
