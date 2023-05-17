import React from 'react';
import useTranslation from '~/config/lang';

const DownloadApp = () => {
    const { Translate: t } = useTranslation();

    return (
        <section className="ps-download-app">
            <div className="ps-container">
                <div className="ps-block--download-app">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 ">
                                <div className="ps-block__thumbnail">
                                    <img
                                        src="/static/img/app.png"
                                        alt="PriceShare"
                                    />
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 ">
                                <div className="ps-block__content">
                                    <h3
                                        style={{
                                            color: '#000',
                                        }}
                                    >
                                        {t('download_priceshare')}
                                    </h3>
                                    <p>{t('download_desc')}</p>
                                    {/* <form
                                    className="ps-form--download-app preventSwitch"
                                    action="do_action"
                                    method="post"
                                >
                                    <div className="form-group--nest">
                                        <input
                                            className="form-control"
                                            type="Email"
                                            placeholder="Email Address"
                                        />
                                        <button className="ps-btn">
                                            {t("subscribe")}
                                        </button>
                                    </div>
                                </form> */}
                                    <p className="download-link">
                                        <a href="#">
                                            <img
                                                src="/static/img/google-play.png"
                                                alt="PriceShare"
                                            />
                                        </a>
                                        <a href="#">
                                            <img
                                                src="/static/img/app-store.png"
                                                alt="PriceShare"
                                            />
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DownloadApp;
