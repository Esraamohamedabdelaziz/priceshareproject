import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
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

const LoginForm = ({ samePageRefresh = false }) => {
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

    const handleLoginSubmit = async (e) => {
        setLoading(true);
        await authenticationService
            .onLogIn(e, setUser, user, false)
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
                setUser({
                    registerationMessage:
                        'Registration unsuccessful, please try again!',
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
            return res;
        });
        console.log(res);
    };

    const onFacebookLogin = (e) => {
        console.log(e);
        authenticationService
            .onLogIn(e, setUser, user, true)
            .then((response) => {
                console.log(response);
                setLoading(false);
                if (response == 400) {
                    onFacebookRegister(e);
                }
            });
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
            <Form
                className="ps-form--account"
                onFinish={(e) => handleLoginSubmit(e)}
            >
                <ul className="ps-tab-list" style={{ textAlign: 'center' }}>
                    {/* <li className="active">
                                <Link href="/account/login">
                                    <a>Login</a>
                                </Link>
                            </li> */}
                    <li className="active">
                        <>
                            <Title
                                style={{
                                    margin: 0,
                                    fontSize: '30px',
                                    marginBottom: '10px',
                                }}
                            >
                                {t('welcome_login')}
                            </Title>
                            <Title
                                style={{
                                    margin: 0,
                                    fontSize: '30px',
                                    marginBottom: '5px',
                                }}
                            >
                                {t('sign_in_account')}
                            </Title>
                            <Text level="4">
                                {' '}
                                {t('not_have_account')}
                                <Button
                                    onClick={() => {
                                        dispatch(loginModelController(false));
                                        dispatch(registerModelController(true));
                                    }}
                                    type="link"
                                    style={{ paddingLeft: '1px' }}
                                >
                                    {t('sign_up')}
                                </Button>
                            </Text>
                        </>
                    </li>
                </ul>
                <div className="ps-tab active" id="sign-in">
                    <div className="ps-form__content">
                        <h5
                            style={{
                                color: 'black',
                            }}
                        >
                            {t('login_account')}
                        </h5>
                        <div className="form-group">
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                        type: 'email',
                                    },
                                ]}
                            >
                                <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="Username or email address"
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
                        <div className="form-group">
                            <div className="ps-checkbox">
                                <input
                                    className="form-control"
                                    type="checkbox"
                                    id="remember-me"
                                    name="remember-me"
                                />
                                <label htmlFor="remember-me">
                                    {t('remember_me')}
                                </label>
                            </div>
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
                        <div className="form-group submit">
                            <button
                                type="submit"
                                className="ps-btn ps-btn--fullwidth"
                            >
                                {t('login')}
                            </button>
                        </div>

                        <a href="/account/forget-password">
                            {t('forget_password')}
                        </a>
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
                        callback={onFacebookLogin}
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
                                {t('login_facebook')}
                            </button>
                        )}
                    />
                </div>
            </div>
        </>
    );
};

export default LoginForm;
