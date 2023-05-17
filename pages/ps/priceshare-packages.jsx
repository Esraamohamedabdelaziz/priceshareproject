import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import VendorBanner from '~/components/partials/vendor/VendorBanner';
import VendorAbout from '~/components/partials/vendor/VendorAbout';
import PriceSharePackages from '~/components/partials/priceshare/PriceSharePackages';
import VendorMileStone from '~/components/partials/vendor/VendorMileStone';
import VendorBestFees from '~/components/partials/vendor/VendorBestFees';
import VendorTestimonials from '~/components/partials/vendor/VendorTestimonials';
import VendorFaqs from '~/components/partials/vendor/VendorFaqs';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import Newsletters from '~/components/partials/commons/Newletters';
import useTranslation from '~/config/lang';

const PriceSharePackagesPage = () => {
    const { Translate: t } = useTranslation();
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'PriceShare Packages',
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="Packages">
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} />
                <PriceSharePackages />
            </div>
            {/* <Newsletters layout="container" /> */}
        </PageContainer>
    );
};

export default PriceSharePackagesPage;
