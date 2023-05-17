import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PSSubscriptionService from '../../../services/PSSubscriptionService';
import useTranslation from '~/config/lang';
import { getPriceUnit } from '~/utilities/product-helper';

const CheckoutPS = () => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isCheck, setIsCheck] = useState(false);
    const [packageName, setPackageName] = useState('');
    const [packageValue, setPackageValue] = useState('');
    const [packageNumInvitations, setPackageNumInvitations] = useState('');
    const [amountToBePaid, setAmountToBePaid] = useState('');
    const [usernameToBePaid, setUsernameToBePaid] = useState('');
    const [shareableLink, setShareableLink] = useState('');
    const { Translate: t } = useTranslation();

    const Router = useRouter();
    const psSubscriptionService = new PSSubscriptionService();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (
            JSON.parse(localStorage.getItem('ps_checkout_ready')) &&
            JSON.parse(localStorage.getItem('userData'))
        ) {
            setUsername(
                JSON.parse(localStorage.getItem('userData'))['username']
            );
            setFirstName(JSON.parse(localStorage.getItem('userData'))['name']);
            setLastName(
                JSON.parse(localStorage.getItem('userData'))['last_name']
            );
            setPackageName(
                JSON.parse(localStorage.getItem('ps_checkout_ready'))[
                    'package_name'
                ]
            );
            setPackageValue(
                JSON.parse(localStorage.getItem('ps_checkout_ready'))[
                    'package_value'
                ]
            );
            setPackageNumInvitations(
                JSON.parse(localStorage.getItem('ps_checkout_ready'))[
                    'package_num_invitations'
                ]
            );
            setUsernameToBePaid(
                JSON.parse(localStorage.getItem('ps_checkout_ready'))[
                    'username_to_be_paid'
                ]
            );
            setAmountToBePaid(
                JSON.parse(localStorage.getItem('ps_checkout_ready'))[
                    'amount_to_be_paid'
                ]
            );
            setShareableLink(
                JSON.parse(localStorage.getItem('ps_checkout_ready'))[
                    'shareable_link'
                ]
            );
        } else {
            Router.push('/ps/priceshare-url-check');
        }

        setError('');
    }, []);

    const handleClickPayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        await psSubscriptionService
            .onPSSubscribe(shareableLink, amountToBePaid)
            .then((response) => {
                setLoading(false);
                console.log(response.data);
                if (response == 406) {
                    setError(
                        'Sorry, the link you are using has already reached the maximum number of users.'
                    );
                } else if (response == 500) {
                    setError('Sorry, please try again.');
                } else {
                    Router.push('/ps/priceshare-subscribed');
                }
            });
    };

    return (
        <div className="ps-checkout ps-section--shopping">
            <div className="container">
                <div className="ps-section__header">
                    <h1
                        style={{
                            color: 'black',
                        }}
                    >
                        Checkout - PriceShare Package
                    </h1>
                    <h3 style={{ display: 'block', color: 'black' }}>
                        You have chosen to subscribe to a PriceShare package
                        valued at {packageValue} {getPriceUnit(Router.locale)}{' '}
                        with {packageNumInvitations} invitations to share with
                        your network.
                    </h3>
                </div>
                <div className="ps-section__content">
                    <div className="ps-form--checkout">
                        <div className="ps-form__content">
                            <div className="row">
                                <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                    <h3 className="ps-form__heading">
                                        Contact information
                                    </h3>
                                    <div className="form-group">
                                        <label>Username/Email</label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="Email or phone number"
                                            value={username}
                                            disabled={true}
                                        />
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>First Name</label>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="First Name"
                                                    value={firstName}
                                                    disabled={true}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label>Last Name</label>
                                                <Input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Last Name"
                                                    value={lastName}
                                                    disabled={true}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="Email or phone number"
                                            value={'6279187253'}
                                            disabled={true}
                                        />
                                    </div>

                                    <h3 className="ps-form__heading">
                                        Invitation from
                                    </h3>
                                    <div className="form-group">
                                        <label>Username/Email</label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="Email or phone number"
                                            value={usernameToBePaid}
                                            disabled={true}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Invitation URL</label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="Email or phone number"
                                            value={shareableLink}
                                            disabled={true}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <div className="ps-checkbox makeItFlex">
                                            <input
                                                className="form-control"
                                                type="checkbox"
                                                id="keep-update"
                                            />
                                            <label
                                                htmlFor="keep-update"
                                                style={{
                                                    color: 'black',
                                                }}
                                            >
                                                Keep me up to date on news and
                                                exclusive offers?
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="ps-checkbox makeItFlex">
                                            <input
                                                className="form-control"
                                                type="checkbox"
                                                id="keep-terms"
                                                value={isCheck}
                                                onChange={(e) => {
                                                    setIsCheck(
                                                        e.target.checked
                                                    );
                                                }}
                                            />
                                            <label
                                                htmlFor="keep-terms"
                                                style={{
                                                    color: 'black',
                                                }}
                                            >
                                                Agree to terms & conditions
                                            </label>
                                            <a
                                                href="/termsofuse"
                                                target="_blank"
                                                className="ml-4"
                                            >
                                                <i class="fa fa-external-link"></i>
                                            </a>
                                        </div>
                                    </div>

                                    {loading ? (
                                        <div
                                            className="form-group"
                                            align="center"
                                        >
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
                                    <Button
                                        onClick={handleClickPayment}
                                        style={{
                                            background: '#e32017',
                                            color: 'white',
                                            borderRadius: '5px',
                                            padding: '15px 45px',
                                            height: '53px',
                                            textAlign: 'center',
                                        }}
                                        size="large"
                                        disabled={loading || !isCheck}
                                    >
                                        Proceed to payment
                                    </Button>
                                    {/* <button
                                        className="ps-btn "
                                        onClick={handleClickPayment}
                                        disabled={true}
                                        
                                    >
                                        Proceed to payment
                                    </button> */}
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  ps-block--checkout-order">
                                    <div className="ps-form__orders">
                                        <h3>Your order</h3>
                                        <div className="ps-block--checkout-order">
                                            <div className="ps-block__content">
                                                <figure>
                                                    <figcaption className="makeItFlexWithDir">
                                                        <strong>Product</strong>
                                                        <strong>total</strong>
                                                    </figcaption>
                                                </figure>
                                                <figure className="ps-block__items makeItFlexDir">
                                                    <Link href="/">
                                                        <a>
                                                            <strong>
                                                                {packageName}
                                                                <span>
                                                                    {' '}
                                                                    x 1
                                                                </span>
                                                            </strong>
                                                            <small>
                                                                {getPriceUnit(
                                                                    Router.locale
                                                                )}
                                                                {1 *
                                                                    amountToBePaid}
                                                            </small>
                                                        </a>
                                                    </Link>
                                                </figure>
                                                <figure>
                                                    <figcaption>
                                                        <strong>
                                                            {t('sub_total')}
                                                        </strong>
                                                        <small>
                                                            {getPriceUnit(
                                                                Router.locale
                                                            )}{' '}
                                                            {amountToBePaid}
                                                        </small>
                                                    </figcaption>
                                                </figure>
                                                <figure className="ps-block__total">
                                                    <h3>
                                                        {t('total')}
                                                        <strong>
                                                            {getPriceUnit(
                                                                Router.locale
                                                            )}
                                                            {parseInt(
                                                                amountToBePaid
                                                            )}
                                                            .00
                                                        </strong>
                                                    </h3>
                                                </figure>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPS;
