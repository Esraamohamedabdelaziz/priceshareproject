import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';

import PSSubscriptionService from '../../../services/PSSubscriptionService';
import { loginModelController } from '~/store/auth/action';
import { useDispatch } from 'react-redux';
import useTranslation from '~/config/lang';

const PriceShareURLCheck = () => {
    const Router = useRouter();
    const psSubscriptionService = new PSSubscriptionService();
    const [shareable_link, setShareableLink] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { Translate: t } = useTranslation();
    const dispatch = useDispatch();
    const ref = useRef();
    const packagesLang = t('packages_page');
    const handleShareableLink = (e) => {
        setError('');
        setShareableLink(e.target.value);
        console.log(shareable_link);
    };
    console.log(Router?.query?.sl, 'sl');
    const validate = () => {
        if (shareable_link) {
            return true;
        } else {
            return false;
        }
    };

    useEffect(() => {
        if (Router?.query?.sl) {
            setShareableLink(Router?.query?.sl);
        }
        if (Router?.query?.sl && shareable_link) {
            ref?.current?.click();
        }
    }, [Router?.query?.sl, shareable_link]);

    const handleOnClick = async (e) => {
        console.log('clicked', 'sl');
        e.preventDefault();

        let validated = validate();
        if (validated) {
            setLoading(true);
            const afterLastSlash = shareable_link.substring(
                shareable_link.lastIndexOf('/') + 1
            );
            let response = await psSubscriptionService
                .onPSURLCheck(afterLastSlash)
                .then((response) => {
                    console.log('herehr');
                    console.log(response);
                    setLoading(false);
                    if (response == 406 || response == 400) {
                        setError('Invalid link, please try again.');
                    } else if (response == 200) {
                        // if not logged in, then log them in first
                        if (
                            JSON.parse(localStorage.getItem('userData')) &&
                            JSON.parse(localStorage.getItem('userData'))?.token
                        ) {
                            Router.push('/ps/priceshare-checkout');
                        } else {
                            dispatch(loginModelController(true));
                        }
                    }
                });
        } else {
            setError('Invitation Link is required.');
        }
    };

    return (
        <div className="ps-order-tracking">
            <div className="container">
                <div className="ps-section__header">
                    <h3 style={{ display: 'block' }}>{packagesLang?.title}</h3>
                    <p style={{ display: 'block' }}>
                        {packagesLang?.description},{' '}
                        <a href="/ps/priceshare-packages">
                            {packagesLang?.more}
                        </a>
                        . {packagesLang?.already_subscribe},{' '}
                        <a href="/account/wallet">{packagesLang?.wallet}</a>.
                    </p>
                </div>
                <div className="ps-section__content">
                    <form
                        className="ps-form--order-tracking"
                        action="/"
                        method="get"
                    >
                        <div className="form-group">
                            <label style={{ color: '#000' }}>
                                {packagesLang?.invitation_link}
                            </label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder={
                                    packagesLang?.invitation_link_placeholder
                                }
                                onChange={handleShareableLink}
                            />
                        </div>
                        {loading ? (
                            <div className="form-group" align="center">
                                <img src="/static/loading.gif" />
                            </div>
                        ) : (
                            ''
                        )}
                        {error ? (
                            <div
                                className="form-group"
                                align="center"
                                style={{ color: 'red' }}
                            >
                                {error}
                            </div>
                        ) : (
                            ''
                        )}
                        <div className="form-group">
                            <button
                                className="ps-btn ps-btn--fullwidth"
                                onClick={handleOnClick}
                                disabled={loading}
                                ref={ref}
                            >
                                {packagesLang?.subscribe}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PriceShareURLCheck;
