import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import Newsletters from '~/components/partials/commons/Newletters';
import PriceShareURLCheck from '~/components/partials/priceshare/PriceShareURLCheck';
import useTranslation from '~/config/lang';

const PriceShareURLCheckPage = () => {
    const { Translate: t } = useTranslation();
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'PriceShare Redeem Invitation',
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="Packages">
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} />
            </div>
            <PriceShareURLCheck />
            {/* <Newsletters layout="container"/> */}
        </PageContainer>
    );
};

export default PriceShareURLCheckPage;
