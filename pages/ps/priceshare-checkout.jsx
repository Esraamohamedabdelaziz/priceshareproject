import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import Newsletters from '~/components/partials/commons/Newletters';
import CheckoutPS from '~/components/partials/account/CheckoutPS';
import useTranslation from '~/config/lang';

const PriceShareCheckoutPage = () => {
    const { Translate: t } = useTranslation();

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'PriceShare Checkout',
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="Packages">
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} />
            </div>
            <CheckoutPS />
            {/* <Newsletters layout="container"/> */}
        </PageContainer>
    );
};

export default PriceShareCheckoutPage;
