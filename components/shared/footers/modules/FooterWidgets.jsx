import React from 'react';
import Link from 'next/link';
import { Form, Input, message } from 'antd';
import SupportService from '~/services/SupportService';
import useTranslation from '~/config/lang';
import { toast } from 'react-toastify';

const FooterWidgets = () => {
    const { Translate: t } = useTranslation();
    const handleSubmit = (e) => {
        const supportService = new SupportService();
        supportService.onNewsSubscribe(e['email'], false).then((data) => {
            if (data == 200) {
                toast.success(t('subcribe_success'));
            } else {
                toast.error('Pls try again!');
            }
        });
    };
    return (
        <div className="ps-footer__widgets p-5">
            <aside className="widget widget_footer widget_contact-us makeItFlexWithDir">
                <h4
                    className="widget-title makeItFlex"
                    style={{
                        color: '#000',
                    }}
                >
                    {t('contact_us')}
                </h4>
                <div className="widget_content">
                    <p>{t('call_us')}</p>
                    <h3 className="makeItFlex">+971-545-726-367</h3>
                    <p>
                        Dubai, UAE <br />
                        <a href="mailto:contact@PriceShare.co">
                            &nbsp;&nbsp; contact@priceshare.com
                        </a>
                    </p>
                    <ul className="ps-list--social makeItFlex">
                        <li>
                            <a className="facebook" href="#">
                                <i className="fa fa-facebook"></i>
                            </a>
                        </li>
                        <li>
                            <a className="twitter" href="#">
                                <i className="fa fa-twitter"></i>
                            </a>
                        </li>
                        <li>
                            <a className="google-plus" href="#">
                                <i className="fa fa-google-plus"></i>
                            </a>
                        </li>
                        <li>
                            <a className="instagram" href="#">
                                <i className="fa fa-instagram"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
            <aside className="widget widget_footer makeItFlexWithDir">
                <h4
                    className="widget-title"
                    style={{
                        color: '#000',
                    }}
                >
                    {t('quick_links')}
                </h4>
                <ul className="ps-list--link">
                    <li>
                        <Link href="/termsofuse">
                            <a>{t('terms')}</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/privacypolicy">
                            <a>{t('privacy')}</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/faqs#shipping">
                            <a>{t('shipping')}</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/faqs#return">
                            <a>{t('returns')}</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/faqs">
                            <a>{t('faqs')}</a>
                        </Link>
                    </li>
                </ul>
            </aside>
            <aside className="widget widget_footer makeItFlexWithDir">
                <h4
                    className="widget-title"
                    style={{
                        color: '#000',
                    }}
                >
                    {t('company')}
                </h4>
                <ul className="ps-list--link">
                    <li>
                        <Link href="#">
                            <a>{t('about_us')}</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="#">
                            <a>{t('affiliate')}</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="#">
                            <a>{t('careers')}</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact-us">
                            <a>{t('contact_us')}</a>
                        </Link>
                    </li>
                </ul>
            </aside>
            <aside className="widget widget_footer makeItFlexWithDir">
                <h4
                    className="widget-title"
                    style={{
                        color: '#000',
                    }}
                >
                    {t('newsletter')}
                </h4>
                <Form
                    className="ps-form--newsletter"
                    action="do_action"
                    method="post"
                    style={{ width: '100%' }}
                    onFinish={(e) => handleSubmit(e)}
                >
                    <div className="d-flex flex-column">
                        <div className="">
                            <div className="ps-form__left">
                                <p>{t('Subcribe_info')}</p>
                            </div>
                        </div>
                        <div className=" mt-5">
                            <div className="ps-form__right preventSwitch">
                                <div className="form-group--nest">
                                    <Form.Item
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your email!',
                                                type: 'email',
                                            },
                                        ]}
                                    >
                                        <Input
                                            style={{ minWidth: '150px' }}
                                            className="form-control"
                                            type="email"
                                            placeholder={t('email_fields')}
                                        />
                                    </Form.Item>
                                    <button
                                        className="ps-btn"
                                        type="submit"
                                        style={{ height: '50px' }}
                                    >
                                        {t('subcribe')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </aside>
            {/*<aside className="widget widget_footer makeItFlexWithDir">
            <h4 className="widget-title" style={{
                color : '#000'
            }}>Bussiness</h4>
            <ul className="ps-list--link">
                <li>
                    <Link href="/page/about-us">
                        <a>Our Press</a>
                    </Link>
                </li>
                <li>
                    <Link href="/account/checkout">
                        <a>Checkout</a>
                    </Link>
                </li>
                <li>
                    <Link href="/account/user-information">
                        <a>My account</a>
                    </Link>
                </li>
                <li>
                    <Link href="/shop">
                        <a>Shop</a>
                    </Link>
                </li>
            </ul>
        </aside>*/}
        </div>
    );
};

export default FooterWidgets;
