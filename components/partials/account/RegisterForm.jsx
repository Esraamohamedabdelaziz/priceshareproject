import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import Link from 'next/link';
import AuthenticationService from '../../../services/AuthenticationService';
import { useDispatch } from 'react-redux';
import Router, { useRouter } from 'next/router';
import {
    login,
    loginModelController,
    registerModelController,
} from '~/store/auth/action';
import { Space, Typography } from 'antd';
import useTranslation from '~/config/lang';

const RegisterForm = ({ samePageRefresh = false }) => {
    const authenticationService = new AuthenticationService();
    const [loading, setLoading] = useState(false);
    const [loadingRegister, setLoadingRegister] = useState(false);
    const { Translate: t } = useTranslation();
    const dispatch = useDispatch();
    const router = useRouter();
    const [user, setUser] = React.useState({
        isLoggedIn: false,
        user: {},
        errorMsg: '',
        registerationMessage: '',
        color: 'red',
    });
    const [error, setError] = useState(null);
    const handleForgetPassword = () => {
        Router.push('../account/forget-password');
    };

    const handleSubmit = async (e) => {
        setLoadingRegister(true);
        setUser({
            ...user,
            registerationMessage: '',
            color: 'red',
        });
        const authenticationService = new AuthenticationService();
        const res = await authenticationService
            .onRegister(
                e['email'],
                e['first_name'],
                e['last_name'],
                e['phone'],
                e['password'],
                false
            )
            .then((res) => {
                console.log(res);
                setLoadingRegister(false);
                if (res == 409) {
                    setUser({
                        ...user,
                        registerationMessage:
                            'Email is already registered. Try to login instead.',
                        color: 'red',
                    });
                } else if (res == 400) {
                    setUser({
                        registerationMessage:
                            'Registration unsuccessful, please try again!',
                        color: 'red',
                    });
                } else {
                    setUser({
                        ...user,
                        registerationMessage:
                            'Registration successful, you can now log in!',
                        color: 'green',
                    });
                }
            });

        return res;

        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
        //         this.props.dispatch(login());
        //         Router.push('/account/login');
        //     } else {
        //     }
        // });
    };

    const onFacebookLogin = (e) => {
        console.log(e);
        authenticationService
            .onLogIn(e, setUser, user, true)
            .then((response) => {
                console.log(response);
                setLoading(false);
                if (response == 400) {
                    setError('Username and/or password incorrect.');
                }
            });
    };
    const onFacebookRegister = async (e) => {
        setLoadingRegister(true);
        setUser({
            ...user,
            registerationMessage: '',
            color: 'red',
        });

        const authenticationService = new AuthenticationService();
        const res_promise = authenticationService.onRegister(
            e['email'],
            e['first_name'],
            e['last_name'],
            e['phone'],
            'dummy_password',
            true
        );
        const res = await res_promise.then((res) => {
            setLoadingRegister(false);
            if (res == 409) {
                onFacebookLogin(e);
            } else if (res == 400) {
                setUser({
                    registerationMessage:
                        'Registration unsuccessful, please try again!',
                    color: 'red',
                });
            } else {
                setUser({
                    ...user,
                    registerationMessage:
                        'Registration successful, you can now log in!',
                    color: 'green',
                });
            }
            return res;
        });
        console.log(res);
    };

    React.useEffect(() => {
        if (user.isLoggedIn) {
            dispatch(login(user.user));
            if (samePageRefresh) window.location.reload();
            else Router.push('/');
        }
    }, [user]);
    const { Title, Text } = Typography;
    return (
        <>
            <Form className="ps-form--account" onFinish={handleSubmit}>
                <ul className="ps-tab-list">
                    <>
                        <Title
                            style={{
                                margin: 0,
                                fontSize: '30px',
                                marginBottom: '5px',
                            }}
                        >
                            {t('create_account')}
                        </Title>
                        <Text level="4">
                            {' '}
                            {t('have_account')}?{' '}
                            <Button
                                onClick={() => {
                                    dispatch(registerModelController(false));
                                    dispatch(loginModelController(true));
                                }}
                                type="link"
                                style={{ paddingLeft: '1px' }}
                            >
                                {t('sign_in_account')}
                            </Button>
                        </Text>
                    </>
                </ul>
                <div className="ps-tab active" id="register">
                    <div
                        className="ps-form__content"
                        style={{
                            padding: '30px',
                        }}
                    >
                        <h5
                            style={{
                                color: 'black',
                            }}
                        >
                            {t('create_your_account')}
                        </h5>
                        <div className="form-group">
                            <Form.Item
                                name="first_name"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please input your first name!',
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
                        <div className="form-group">
                            <Form.Item
                                name="last_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your last name!',
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
                        <div className="form-group">
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        type: 'email',
                                        message: 'Please input a valid email!',
                                    },
                                ]}
                            >
                                <Input
                                    className="form-control"
                                    type="email"
                                    placeholder={t('email_fields')}
                                />
                            </Form.Item>
                        </div>
                        <div className="form-group">
                            <Form.Item
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Phone!',
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
                        <div className="form-group form-forgot">
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input
                                    className="form-control"
                                    type="password"
                                    placeholder="Password..."
                                />
                            </Form.Item>
                        </div>
                        <div className="form-group form-forgot">
                            <Form.Item
                                name="confirm_password"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (
                                                !value ||
                                                getFieldValue('password') ===
                                                    value
                                            ) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                new Error(
                                                    'The passwords you entered do not match!'
                                                )
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <Input
                                    className="form-control"
                                    type="password"
                                    placeholder="Confirm password..."
                                />
                            </Form.Item>
                        </div>
                        {user.registerationMessage && (
                            <p style={{ color: user.color }}>
                                {user.registerationMessage}
                            </p>
                        )}
                        {loadingRegister ? (
                            <div className="form-group" align="center">
                                <img src="/static/loading.gif" />
                            </div>
                        ) : (
                            ''
                        )}

                        <div className="form-group submit">
                            <button
                                type="submit"
                                className="ps-btn ps-btn--fullwidth"
                            >
                                {t('register')}
                            </button>
                        </div>
                    </div>
                </div>
            </Form>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div
                    style={{
                        marginTop: '10px',
                        maxWidth: '300px',
                    }}
                >
                    <FacebookLogin
                        appId="1135885293954326"
                        fields="first_name,last_name,email"
                        scope="email"
                        callback={onFacebookRegister}
                        render={(renderProps) => (
                            <button
                                onClick={renderProps.onClick}
                                className="ps-btn ps-btn--fullwidthFacebook"
                            >
                                <span>
                                    <img
                                        src="/static/img/facebookIcon.png"
                                        style={{
                                            width: '9px',
                                            objectFit: 'fill',
                                            marginRight: '5px',
                                        }}
                                    />
                                </span>{' '}
                                Register with Facebook
                            </button>
                        )}
                    />
                </div>
            </div>
        </>
    );
};

export default RegisterForm;
