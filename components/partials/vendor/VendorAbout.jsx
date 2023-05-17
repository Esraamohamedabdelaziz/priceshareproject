import React from 'react';
import useTranslation from '~/config/lang';

const VendorAbout = () => {
    const { Translate } = useTranslation();
    const t = Translate('sell_priceshare')?.why;
    return (
        <div className="ps-section--vendor ps-vendor-about">
            <div className="container">
                <div className="ps-section__header">
                    <p>{t?.title}</p>
                    <h4>{t?.description}</h4>
                </div>
                <div className="ps-section__content">
                    <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                            <div className="ps-block--icon-box-2">
                                <div className="ps-block__thumbnail">
                                    <img
                                        src="/static/img/icons/vendor-1.png"
                                        alt="PriceShare"
                                    />
                                </div>
                                <div className="ps-block__content">
                                    <h4> {t?.section1?.title}</h4>
                                    <div
                                        className="ps-block__desc"
                                        data-mh="about-desc"
                                    >
                                        <p>{t?.section1?.description}</p>
                                    </div>
                                    {/* <a href="#">{t?.section1?.link}</a> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                            <div className="ps-block--icon-box-2">
                                <div className="ps-block__thumbnail">
                                    <img
                                        src="/static/img/icons/vendor-2.png"
                                        alt="PriceShare"
                                    />
                                </div>
                                <div className="ps-block__content">
                                    <h4>{t?.section2?.title}</h4>
                                    <div
                                        className="ps-block__desc"
                                        data-mh="about-desc"
                                    >
                                        <p>{t?.section2?.description}</p>
                                    </div>
                                    {/* <a href="#">{t?.section2?.link}</a> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                            <div className="ps-block--icon-box-2">
                                <div className="ps-block__thumbnail">
                                    <img
                                        src="/static/img/icons/vendor-3.png"
                                        alt="PriceShare"
                                    />
                                </div>
                                <div className="ps-block__content">
                                    <h4>{t?.section3?.title}</h4>
                                    <div
                                        className="ps-block__desc"
                                        data-mh="about-desc"
                                    >
                                        <p>{t?.section3?.description}</p>
                                    </div>
                                    {/*<a href="#">{t?.section3?.link}</a>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorAbout;
