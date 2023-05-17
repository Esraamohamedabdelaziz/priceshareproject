import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { loginModelController, logOut } from '~/store/auth/action';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { Form, Input } from 'antd';
import AuthenticationService from '~/services/AuthenticationService';
import useTranslation from '~/config/lang';

const UserInformation = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [userData, serUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { Translate: t } = useTranslation();
    const [user, setUser] = React.useState({
        isLoggedIn: false,
        user: {},
        errorMsg: '',
        message: '',
        color: 'red',
    });
    console.log(userData, 'userData');
    useEffect(() => {
        getUser();
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logOut());
        dispatch(loginModelController(true));
    };
    const getUser = (e) => {
        setLoading(true);
        setUser({
            ...user,
            message: '',
            color: 'red',
        });
        const authenticationService = new AuthenticationService();
        authenticationService.getAccountInfo().then((res) => {
            console.log(res);
            setLoading(false);
            if (res == 409) {
                setUser({
                    ...user,
                    message: 'Unsuccessful, please try again!',
                    color: 'red',
                });
            } else if (res == 400) {
                setUser({
                    message: 'Unsuccessful, please try again!',
                    color: 'red',
                });
            } else {
                console.log(res, 'useruseruser');
                serUserData(res);
            }
        });
    };

    const handleSubmit = (e) => {
        setLoading(true);
        setUser({
            ...user,
            message: '',
            color: 'red',
        });
        const authenticationService = new AuthenticationService();
        authenticationService
            .onChangeAccountInfo(
                e['first_name'],
                e['last_name'],
                e['phone'],
                false
            )
            .then((res) => {
                console.log(res);
                setLoading(false);
                if (res == 409) {
                    setUser({
                        ...user,
                        message:
                            'Email is already registered. Try to login instead.',
                        color: 'red',
                    });
                } else if (res == 400) {
                    setUser({
                        message: 'Unsuccessful, please try again!',
                        color: 'red',
                    });
                } else {
                    setUser({
                        ...user,
                        message: 'Uptated successful!',
                        color: 'green',
                    });
                }
            });
    };
    const accountLinks = [
        {
            text: t('account_info'),
            url: '/account/user-information',
            icon: 'icon-user',
            active: true,
        },
        {
            text: `${t('wallet_priceshare')}`,
            url: '/account/wallet',
            icon: 'icon-wallet',
        },

        {
            text: t('wishlist'),
            url: '/account/wishlist',
            icon: 'icon-heart',
        },
        {
            text: t('orders'),
            url: '/account/orders',
            icon: 'icon-cube',
        },
        {
            text: t('addresses')?.address,
            url: '/addresses',
            icon: 'icon-cube',
        },
    ];

    //Views
    const accountLinkView = accountLinks.map((item) => (
        <li key={item.text} className={item.active ? 'active' : ''}>
            <Link href={item.url}>
                <a>
                    <i className={item.icon}></i>
                    {item.text}
                </a>
            </Link>
        </li>
    ));

    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="ps-section__left">
                            <aside className="ps-widget--account-dashboard">
                                <div className="ps-widget__header">
                                    <figure>
                                        <figcaption>Hello</figcaption>
                                        <p style={{ color: 'black' }}>
                                            {username}
                                        </p>
                                    </figure>
                                </div>
                                <div className="ps-widget__content">
                                    <ul className="ps-list--user-links">
                                        {accountLinks.map((link) => (
                                            <li
                                                key={link.text}
                                                className={
                                                    link.active ? 'active' : ''
                                                }
                                            >
                                                <Link href={link.url}>
                                                    <a
                                                        style={{
                                                            color: 'black',
                                                        }}
                                                    >
                                                        <i
                                                            className={
                                                                link.icon
                                                            }
                                                        ></i>
                                                        {link.text}
                                                    </a>
                                                </Link>
                                            </li>
                                        ))}
                                        <li>
                                            <li>
                                                <a
                                                    style={{ color: '#000' }}
                                                    onClick={(e) =>
                                                        handleLogout(e)
                                                    }
                                                >
                                                    <i className="icon-power-switch"></i>
                                                    {t('logout')}
                                                </a>
                                            </li>
                                        </li>
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="ps-page__content">
                            {userData && (
                                <Form
                                    className="ps-form--account-setting"
                                    onFinish={(e) => handleSubmit(e)}
                                >
                                    <div className="ps-form__header">
                                        <h3>{t('account_info')}</h3>
                                    </div>
                                    <div className="ps-form__content">
                                        <div className="form-group">
                                            <Form.Item
                                                initialValue={
                                                    userData?.username
                                                }
                                                name="username"
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
                                                    disabled={true}
                                                    className="form-control"
                                                    type="email"
                                                    placeholder="email address"
                                                />
                                            </Form.Item>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <Form.Item
                                                        initialValue={
                                                            userData?.first_name
                                                        }
                                                        name="first_name"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please input your First Name!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input
                                                            className="form-control"
                                                            type="text"
                                                            placeholder="First Name"
                                                        />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <Form.Item
                                                        initialValue={
                                                            userData?.last_name
                                                        }
                                                        name="last_name"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please input your Last Name!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input
                                                            className="form-control"
                                                            type="text"
                                                            placeholder="Last Name"
                                                        />
                                                    </Form.Item>
                                                </div>
                                            </div>

                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <Form.Item
                                                        initialValue={
                                                            userData?.phone
                                                        }
                                                        name="phone"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Please input your Phone!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input
                                                            className="form-control"
                                                            type="text"
                                                            placeholder="Phone"
                                                        />
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>
                                        {user.message && (
                                            <p style={{ color: user.color }}>
                                                {user.message}
                                            </p>
                                        )}
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
                                        <div className="form-group submit">
                                            <button className="ps-btn">
                                                {t('update_profile')}
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserInformation;
