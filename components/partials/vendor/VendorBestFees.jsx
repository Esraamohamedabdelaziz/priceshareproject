import { useRouter } from 'next/router';
import React from 'react';
import useTranslation from '~/config/lang';

const VendorBestFrees = () => {
    const { Translate } = useTranslation();
    const t = Translate('sell_priceshare')?.fees;
    return (
        <div className="ps-section--vendor ps-vendor-best-fees">
            <div className="container">
                <div className="ps-section__header">
                    <p>{t?.title}</p>
                    <h4>{t?.description}</h4>
                </div>
                <div className="ps-section__content">
                    <h5>{t?.fee_desc}</h5>
                    <div className="ps-section__numbers">
                        <figure>
                            <h3>{t?.fee1_value1}</h3>
                            <span>{t?.fee1}</span>
                        </figure>
                        <figure>
                            <h3>{t?.fee2_value2}</h3>
                            <span>{t?.fee2}</span>
                        </figure>
                    </div>
                    <div className="ps-section__desc">
                        <figure>
                            <figcaption>{t?.benefit_title}</figcaption>
                            <ul>
                                <li>{t?.benefit1}</li>
                                <li>{t?.benefit2}</li>
                                <li>{t?.benefit3}</li>
                            </ul>
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorBestFrees;
