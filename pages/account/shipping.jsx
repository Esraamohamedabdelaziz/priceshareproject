import React from 'react';

import { connect } from 'react-redux';

import BreadCrumb from '~/components/elements/BreadCrumb';

import Shipping from '~/components/partials/account/Shipping';

import PageContainer from '~/components/layouts/PageContainer';

import FooterDefault from '~/components/shared/footers/FooterDefault';

import Newletters from '~/components/partials/commons/Newletters';
import useTranslation from '~/config/lang';

const ShippingPage = () => {
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

            url: '/account/checkout',
        },

        {
            text: 'Shipping',
        },
    ];

    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Shipping">
                <div className="ps-page--simple">
                    <BreadCrumb breacrumb={breadCrumb} />

                    <Shipping />
                </div>

                {/* <Newletters layout="container" /> */}
            </PageContainer>
        </>
    );
};

export default connect()(ShippingPage);
