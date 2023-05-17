import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';

import Checkout from '~/components/partials/account/Checkout';

import FooterDefault from '~/components/shared/footers/FooterDefault';

import PageContainer from '~/components/layouts/PageContainer';

import Newletters from '~/components/partials/commons/Newletters';
import AuthWrappers from '~/components/layouts/wrappers/AuthWrappers';
import useTranslation from '~/config/lang';

const CheckoutPage = () => {
    const { Translate: t } = useTranslation();

    const breadCrumb = [
        {
            text: 'Home',

            url: '/',
        },

        {
            text: t('shopping_cart'),

            url: '/account/shopping-cart',
        },

        {
            text: t('checkout_page')?.title,
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="Checkout">
            <div className="ps-page--simple">
                <BreadCrumb breacrumb={breadCrumb} />
                <AuthWrappers>
                    <Checkout />
                </AuthWrappers>
            </div>

            {/* <Newletters layout="container" /> */}
        </PageContainer>
    );
};

export default CheckoutPage;
