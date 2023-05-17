import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import TermsOfUseContent from '~/components/partials/page/TermsOfUseContent';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import useTranslation from '~/config/lang';

const TermsOfUsePage = () => {
    const { Translate: t } = useTranslation();

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Terms & Conditions',
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="Terms & Conditions">
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="container">
                    <TermsOfUseContent />
                </div>
            </div>
            {/* <Newletters layout="container" /> */}
        </PageContainer>
    );
};

export default TermsOfUsePage;
