import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';

import Payment from '~/components/partials/account/Payment';

import { connect } from 'react-redux';

import PageContainer from '~/components/layouts/PageContainer';

import FooterDefault from '~/components/shared/footers/FooterDefault';

import Newletters from '~/components/partials/commons/Newletters';
import useTranslation from '~/config/lang';

const PaymentPage = () => {
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
            text: 'Payment',
        },
    ];

    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Payment">
                <div className="ps-page--simple">
                    <BreadCrumb breacrumb={breadCrumb} />

                    <Payment />
                </div>

                {/* <Newletters layout="container" /> */}
            </PageContainer>
        </>
    );
};

export default connect()(PaymentPage);
