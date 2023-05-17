import React from 'react';
import Router, { useRouter } from 'next/router';
import { getPriceUnit } from '~/utilities/product-helper';
import useTranslation from '~/config/lang';

const PriceSharePackages = () => {
    const router = useRouter();
    const { Translate: t } = useTranslation();
    const handleOnClickSubscribe = () => {
        Router.push('/ps/priceshare-url-check');
    };

    const pricesharePackagesLang = t('priceshare_packages');
    return (
        <div className="ps-section--vendor ps-vendor-about">
            <div className="container">
                <div className="ps-section__header">
                    <p style={{ display: 'block' }}>
                        {pricesharePackagesLang?.lang}
                    </p>
                    <h4>
                        {pricesharePackagesLang?.marketplace}
                        <br /> {pricesharePackagesLang?.type}
                    </h4>
                </div>
                <div className="ps-section__content">
                    <div className="row">
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                            <div className=" ps-vendor-best-fees">
                                <div className=" ps-section__numbers">
                                    <figure
                                        align="center"
                                        style={{
                                            width: '250px',
                                            height: '250px',
                                        }}
                                    >
                                        <h3>
                                            100 {getPriceUnit(router.locale)}
                                        </h3>
                                        <span>
                                            {
                                                pricesharePackagesLang?.price_package
                                            }
                                        </span>
                                    </figure>
                                </div>
                            </div>
                            <div className="ps-block--icon-box-2">
                                <div className="ps-block__content">
                                    <h3 style={{ display: 'block' }}>
                                        {
                                            pricesharePackagesLang?.subscribe1_title
                                        }
                                    </h3>
                                    <div
                                        className="ps-block__desc"
                                        data-mh="about-desc"
                                    >
                                        <p style={{ display: 'block' }}>
                                            {
                                                pricesharePackagesLang?.subscribe1_desc
                                            }
                                            <span
                                                style={{
                                                    fontWeight: '900',
                                                    color: '#e32017',
                                                }}
                                            >
                                                {
                                                    pricesharePackagesLang?.subscribe1_only
                                                }
                                            </span>
                                            .{' '}
                                            {
                                                pricesharePackagesLang?.subscribe2_receive
                                            }
                                        </p>
                                    </div>
                                </div>
                                <br />
                                <button
                                    className="ps-btn"
                                    onClick={handleOnClickSubscribe}
                                >
                                    {pricesharePackagesLang?.subscribe}
                                </button>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                            <div className="ps-vendor-best-fees">
                                <div className=" ps-section__numbers">
                                    <figure
                                        align="center"
                                        style={{
                                            width: '250px',
                                            height: '250px',
                                        }}
                                    >
                                        <h3>
                                            500 {getPriceUnit(router.locale)}
                                        </h3>
                                        <span>
                                            {
                                                pricesharePackagesLang?.price_package
                                            }
                                        </span>
                                    </figure>
                                </div>
                            </div>
                            <div className="ps-block--icon-box-2">
                                <div className="ps-block__content">
                                    <h3 style={{ display: 'block' }}>
                                        {
                                            pricesharePackagesLang?.subscribe2_title
                                        }
                                    </h3>
                                    <div
                                        className="ps-block__desc"
                                        data-mh="about-desc"
                                    >
                                        <p style={{ display: 'block' }}>
                                            {
                                                pricesharePackagesLang?.subscribe2_desc
                                            }
                                            <span
                                                style={{
                                                    fontWeight: '900',
                                                    color: '#e32017',
                                                }}
                                            >
                                                {
                                                    pricesharePackagesLang?.subscribe2_only
                                                }
                                            </span>
                                            .{' '}
                                            {
                                                pricesharePackagesLang?.subscribe2_receive
                                            }
                                        </p>
                                    </div>
                                </div>
                                <br />
                                <button
                                    className="ps-btn"
                                    onClick={handleOnClickSubscribe}
                                >
                                    {pricesharePackagesLang?.subscribe}
                                </button>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                            <div className=" ps-vendor-best-fees">
                                <div className=" ps-section__numbers">
                                    <figure
                                        align="center"
                                        style={{
                                            width: '250px',
                                            height: '250px',
                                        }}
                                    >
                                        <h3>
                                            1000 {getPriceUnit(router.locale)}
                                        </h3>
                                        <span>
                                            {
                                                pricesharePackagesLang?.price_package
                                            }
                                        </span>
                                    </figure>
                                </div>
                            </div>

                            <div className="ps-block--icon-box-2">
                                <div className="ps-block__content">
                                    <h3 style={{ display: 'block' }}>
                                        {
                                            pricesharePackagesLang?.subscribe3_title
                                        }
                                    </h3>
                                    <div
                                        className="ps-block__desc"
                                        data-mh="about-desc"
                                    >
                                        <p style={{ display: 'block' }}>
                                            {
                                                pricesharePackagesLang?.subscribe3_desc
                                            }
                                            <span
                                                style={{
                                                    fontWeight: '900',
                                                    color: '#e32017',
                                                }}
                                            >
                                                {
                                                    pricesharePackagesLang?.subscribe3_only
                                                }
                                            </span>
                                            .{' '}
                                            {
                                                pricesharePackagesLang?.subscribe3_receive
                                            }
                                        </p>
                                    </div>
                                </div>
                                <br />
                                <button
                                    className="ps-btn"
                                    onClick={handleOnClickSubscribe}
                                >
                                    {pricesharePackagesLang?.subscribe}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PriceSharePackages;
