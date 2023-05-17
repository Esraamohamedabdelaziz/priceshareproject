import React from 'react';
import useTranslation from '~/config/lang';

const Newsletters = ({ layout }) => {
    const { Translate: t } = useTranslation();

    return (
        <section className="ps-newsletter">
            <div
                className={
                    layout && layout === 'container'
                        ? ' container'
                        : 'ps-container'
                }
            >
                <form
                    className="ps-form--newsletter"
                    action="do_action"
                    method="post"
                >
                    <div className="row">
                        <div className="col-xl-5 col-lg-12 col-md-12 col-sm-12 col-12 ">
                            <div className="ps-form__left">
                                <h3
                                    style={{
                                        color: 'black',
                                    }}
                                >
                                    Newsletter
                                </h3>
                                <p>
                                    Subcribe to get information about products
                                    and coupons
                                </p>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-12 col-md-12 col-sm-12 col-12 ">
                            <div className="ps-form__right preventSwitch">
                                <div className="form-group--nest">
                                    <input
                                        className="form-control"
                                        type="email"
                                        placeholder={t('email_fields')}
                                    />
                                    <button className="ps-btn">
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Newsletters;
