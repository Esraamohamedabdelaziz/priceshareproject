import React from 'react';
import useTranslation from '~/config/lang';

const VendorMileStone = () => {
    const { Translate } = useTranslation();
    const t = Translate('sell_priceshare')?.how;
    return (
        <div className="ps-section--vendor ps-vendor-milestone">
            <div className="container">
                <div className="ps-section__header">
                    <p>{t?.title}</p>
                    <h4>{t?.description}</h4>
                </div>
                <div className="ps-section__content">
                    <div className="ps-block--vendor-milestone">
                        <div className="ps-block__left">
                            <h4>{t?.section1?.title}</h4>
                            <ul>
                                <li>{t?.section1?.point1}</li>
                                <li>{t?.section1?.point2}</li>
                            </ul>
                        </div>
                        <div className="ps-block__right">
                            <img
                                src="/static/img/vendor/milestone-1.png"
                                alt="PriceShare"
                            />
                        </div>
                        <div className="ps-block__number">
                            <span>1</span>
                        </div>
                    </div>
                    <div className="ps-block--vendor-milestone reverse">
                        <div className="ps-block__left">
                            <h4>{t?.section2?.title}</h4>
                            <ul>
                                <li>{t?.section2?.point1}</li>
                                <li>{t?.section2?.point2}</li>
                            </ul>
                        </div>
                        <div className="ps-block__right">
                            <img
                                src="/static/img/vendor/milestone-2.png"
                                alt="PriceShare"
                            />
                        </div>
                        <div className="ps-block__number">
                            <span>2</span>
                        </div>
                    </div>
                    {/*<div className="ps-block--vendor-milestone">
                        <div className="ps-block__left">
                            <h4>{t?.section3?.title}</h4>
                            <ul>
                                <li>{t?.section3?.point1}</li>
                                <li>{t?.section3?.point2}</li>
                            </ul>
                        </div>
                        <div className="ps-block__right">
                            <img
                                src="/static/img/vendor/milestone-3.png"
                                alt="PriceShare"
                            />
                        </div>
                        <div className="ps-block__number">
                            <span>3</span>
                        </div>
                    </div>
                    <div className="ps-block--vendor-milestone reverse">
                        <div className="ps-block__left">
                            <h4>{t?.section4?.title}</h4>
                            <ul>
                                <li>{t?.section4?.point1}</li>
                                <li>{t?.section4?.point2}</li>
                            </ul>
                        </div>
                        <div className="ps-block__right">
                            <img
                                src="/static/img/vendor/milestone-4.png"
                                alt="PriceShare"
                            />
                        </div>
                        <div className="ps-block__number">
                            <span>4</span>
                        </div>
                    </div>*/}
                </div>
            </div>
        </div>
    );
};

export default VendorMileStone;
