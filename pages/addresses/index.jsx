import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';

import FooterDefault from '~/components/shared/footers/FooterDefault';

import PageContainer from '~/components/layouts/PageContainer';

import Newletters from '~/components/partials/commons/Newletters';
import AddressesList from '~/components/partials/address/AddressesList';
import AuthWrappers from '~/components/layouts/wrappers/AuthWrappers';
import useTranslation from '~/config/lang';

const Address = () => {
    const { Translate: t } = useTranslation();
    const breadCrumb = [
        {
            text: 'Home',

            url: '/',
        },

        {
            text: t('address'),
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title={t('address')}>
            <div className="ps-page--simple">
                <BreadCrumb breacrumb={breadCrumb} />
                <AuthWrappers>
                    <AddressesList />
                </AuthWrappers>
            </div>

            {/* <Newletters layout="container" /> */}
        </PageContainer>
    );
};

export default Address;
