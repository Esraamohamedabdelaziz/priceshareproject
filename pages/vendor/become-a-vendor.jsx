import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import VendorBanner from '~/components/partials/vendor/VendorBanner';
import VendorAbout from '~/components/partials/vendor/VendorAbout';
import VendorMileStone from '~/components/partials/vendor/VendorMileStone';
import VendorBestFees from '~/components/partials/vendor/VendorBestFees';
import VendorTestimonials from '~/components/partials/vendor/VendorTestimonials';
import VendorFaqs from '~/components/partials/vendor/VendorFaqs';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import Newsletters from '~/components/partials/commons/Newletters';
import { BackTop, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import StartSelling from '~/components/partials/account/StartSelling';
import { startSellingModelController } from '~/store/auth/action';
import { useSelector } from 'react-redux';
import useTranslation from '~/config/lang';

const BecomeAVendorPage = () => {
    const { Translate: t } = useTranslation();
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: t('become_vendor'),
        },
    ];

    const dispatch = useDispatch();
    const isStartSellingModelOpen = useSelector(
        (state) => state.auth.isStartSellingModelOpen
    );
    return (
        <PageContainer footer={<FooterDefault />} title={t('become_vendor')}>
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} />
                <VendorBanner />
                <VendorAbout />
                <VendorMileStone />
                {/*<VendorBestFees />
                <VendorTestimonials />
                <VendorFaqs />*/}
                <VendorBanner />
            </div>
            <Modal
                title={null}
                footer={null}
                visible={isStartSellingModelOpen}
                onCancel={() => {
                    dispatch(startSellingModelController(false));
                }}
            >
                <StartSelling samePageRefresh={true} />
            </Modal>
            {/* <Newsletters layout="container" /> */}
        </PageContainer>
    );
};

export default BecomeAVendorPage;
