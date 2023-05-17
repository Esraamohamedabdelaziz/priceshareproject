import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';

import FooterDefault from '~/components/shared/footers/FooterDefault';

import PageContainer from '~/components/layouts/PageContainer';

import Newletters from '~/components/partials/commons/Newletters';
import PublicOrders from '~/components/partials/account/PublicOrders';
import AuthWrappers from '~/components/layouts/wrappers/AuthWrappers';
import useTranslation from '~/config/lang';

const PublicOrdersPage = () => {
    const { Translate: t } = useTranslation();
    const breadCrumb = [
        {
            text: 'Home',

            url: '/',
        },

        {
            text: t('orders'),
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title={t('orders')}>
            <div className="ps-page--simple">
                <BreadCrumb breacrumb={breadCrumb} />
                <AuthWrappers>
                    <PublicOrders />
                </AuthWrappers>
            </div>

            {/* <Newletters layout="container" /> */}
        </PageContainer>
    );
};

export default PublicOrdersPage;
