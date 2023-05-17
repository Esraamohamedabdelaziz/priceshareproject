import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';

import Wallet from '~/components/partials/account/Wallet';

import PageContainer from '~/components/layouts/PageContainer';

import FooterDefault from '~/components/shared/footers/FooterDefault';

import Newletters from '~/components/partials/commons/Newletters';
import useTranslation from '~/config/lang';

const AccountWalletPage = () => {
    const { Translate: t } = useTranslation();
    const breadCrumb = [
        {
            text: 'Home',

            url: '/',
        },

        {
            text: t('wallet_priceshare'),
        },
    ];

    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Wallet">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />

                    <Wallet />
                </div>

                {/* <Newletters layout="container" /> */}
            </PageContainer>
        </>
    );
};

export default AccountWalletPage;
