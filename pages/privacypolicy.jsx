import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PrivacyPolicyContent from '~/components/partials/page/PrivacyPolicyContent';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import useTranslation from '~/config/lang';

const PrivacyPolicyPage = () => {
    const { Translate: t } = useTranslation();

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Privacy Policy',
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="Privacy Policy">
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="container">
                    <PrivacyPolicyContent />
                </div>
            </div>
            {/* <Newletters layout="container" /> */}
        </PageContainer>
    );
};

export default PrivacyPolicyPage;
