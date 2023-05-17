import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import useTranslation from '~/config/lang';
import { getPriceUnit } from '~/utilities/product-helper';
import { useRouter } from 'next/router';
import { Button, message } from 'antd';
import { toast } from 'react-toastify';

const PriceShareSubscribed = (props) => {
    const { Translate: t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [shareable_link, setShareableLink] = useState('');
    const [packageValue, setPackageValue] = useState('');
    const [packageNumInvitations, setPackageNumInvitations] = useState('');
    const Router = useRouter();

    const subscribedLang = t('subscribed_page');
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text);
        toast.success('Invitation Link Copied!');
    }
    useEffect(() => {
        if (JSON.parse(localStorage.getItem('ps_checkout_done'))) {
            setPackageValue(
                JSON.parse(localStorage.getItem('ps_checkout_done'))[
                    'new_package_value'
                ]
            );
            setPackageNumInvitations(
                JSON.parse(localStorage.getItem('ps_checkout_done'))[
                    'new_package_num_invitations'
                ]
            );
            setShareableLink(
                JSON.parse(localStorage.getItem('ps_checkout_done'))[
                    'new_shareable_link'
                ]
            );
        }
    }, []);

    return (
        <div className="ps-order-tracking">
            <div className="container">
                <div className="ps-section__header">
                    <h3 style={{ display: 'block' }}>
                        {subscribedLang?.congratulations}
                    </h3>
                    <h4>
                        {subscribedLang?.welcome}
                        <br /> {subscribedLang?.subscribed} {packageValue}{' '}
                        {getPriceUnit(Router.locale)} .
                    </h4>
                    <br />
                    <p>
                        {subscribedLang?.unique} {subscribedLang?.you_have}
                        {packageNumInvitations}{' '}
                        {subscribedLang?.invitation_available}
                        {packageValue / packageNumInvitations}{' '}
                        {getPriceUnit(Router.locale)}{' '}
                        {subscribedLang?.available_products}
                    </p>
                    <br />
                    <h4 style={{ color: '#000' }}>
                        {subscribedLang?.invitation_link} &nbsp;&nbsp;&nbsp;
                        <a style={{ fontWeight: 600 }}>
                            https://priceshare.com/ps/priceshare-url-check/?sl=/
                            {shareable_link}
                        </a>
                        <Button
                            style={{ marginLeft: '10px' }}
                            onClick={() => {
                                copyToClipboard(
                                    `https://priceshare.com/ps/priceshare-url-check/?sl=/${shareable_link}`
                                );
                            }}
                        >
                            <i className="fa fa-copy" />
                        </Button>
                    </h4>
                    <br />
                    <br />

                    <div className="form-group">
                        <Link href="/account/wallet">
                            <a className="ps-btn">
                                {' '}
                                {subscribedLang?.view_wallet}{' '}
                            </a>
                        </Link>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <Link href="/shop">
                            <a className="ps-btn">{t('shop_now')}</a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PriceShareSubscribed;
