import { useRouter } from 'next/router';
import React from 'react';
import useTranslation from '~/config/lang';
import { getPriceUnit } from '~/utilities/product-helper';

const SiteFeatures = () => {
    const router = useRouter();
    const { Translate: t } = useTranslation();
    const featuresLang = t('feature_section');
    return (
        <div className="ps-site-features">
            <div className="ps-container">
                <div className="ps-block--site-features">
                    <div className="ps-block__item">
                        <div className="ps-block__left">
                            <i className="icon-rocket"></i>
                        </div>
                        <div className="ps-block__right">
                            <h4>{featuresLang.free_delivery}</h4>
                            <p>
                                {featuresLang.free_delivery_desc}{' '}
                                {getPriceUnit(router.locale)}
                            </p>
                        </div>
                    </div>
                    {/*<div className="ps-block__item">
                    <div className="ps-block__left">
                        <i className="icon-sync"></i>
                    </div>
                    <div className="ps-block__right">
                        <h4>90 Days Return</h4>
                        <p>If goods have problems</p>
                    </div>
                </div>*/}
                    <div className="ps-block__item">
                        <div className="ps-block__left">
                            <i className="icon-credit-card"></i>
                        </div>
                        <div className="ps-block__right">
                            <h4>{featuresLang.secure}</h4>
                            <p>{featuresLang.secure_desc}</p>
                        </div>
                    </div>
                    <div className="ps-block__item">
                        <div className="ps-block__left">
                            <i className="icon-bubbles"></i>
                        </div>
                        <div className="ps-block__right">
                            <h4>{featuresLang.support}</h4>
                            <p>{featuresLang.support_desc}</p>
                        </div>
                    </div>
                    {/*<div className="ps-block__item">
                    <div className="ps-block__left">
                        <i className="icon-gift"></i>
                    </div>
                    <div className="ps-block__right">
                        <h4>Gift Service</h4>
                        <p>Support gift service</p>
                    </div>
                </div>*/}
                </div>
            </div>
        </div>
    );
};

export default SiteFeatures;
