import React from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { startSellingModelController } from '~/store/auth/action';
import useTranslation from '~/config/lang';
const VendorBanner = () => {
    const dispatch = useDispatch();
    const { Translate: t } = useTranslation();
    return (
        <div
            className="ps-vendor-banner bg--cover"
            style={{ backgroundImage: "url('/static/img/bg/vendor.jpg')" }}
        >
            <div className="ps-vendor-banner">
                <div className="container">
                    <h2>{t('become_vendor_title')}</h2>
                    <>
                        <a
                            onClick={() =>
                                dispatch(startSellingModelController(true))
                            }
                            className="ps-btn ps-btn--lg"
                            href="#"
                        >
                            {t('start_selling')}
                        </a>
                    </>
                </div>
            </div>
        </div>
    );
};

export default VendorBanner;
