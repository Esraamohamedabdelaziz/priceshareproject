import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import {
    login,
    loginModelController,
    registerModelController,
} from '../../../store/auth/action';

import { Form, Input } from 'antd';
import { connect } from 'react-redux';

import AuthenticationService from '../../../services/AuthenticationService';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { t } from 'i18next';

const Login = (props) => {
    const authenticationService = new AuthenticationService();
    const [loading, setLoading] = useState(false);
    const [loadingRegister, setLoadingRegister] = useState(false);

    const [error, setError] = useState(null);

    const [user, setUser] = React.useState({
        isLoggedIn: false,
        user: {},
        errorMsg: '',
        registerationMessage: '',
        color: 'red',
    });

    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
    };
    const [windowWidth, setWindowWidth] = useState(0);

    React.useEffect(() => {
        console.log(props);

        resizeWindow();
        window.addEventListener('resize', resizeWindow);
        return () => window.removeEventListener('resize', resizeWindow);
    }, [props.auth]);

    React.useEffect(() => {
        if (user.isLoggedIn) {
            props.dispatch(login(user.user));
            console.log(props);
            Router.push('/');
        }
    }, [user]);

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

    if (typeof window !== 'undefined' && window.innerWidth >= 1200) {
        return (
            <div className="ps-my-account-login">
                <div className="containerForLoginAndRegister">
                    <LoginForm />
                    <RegisterForm />
                </div>
            </div>
        );
    } else {
        return (
            <div className="ps-my-account-login-register-layout">
                <div className="containerForLoginAndRegister">
                    <Form
                        className="ps-form--account"
                        onFinish={(e) => handleLoginSubmit(e, props)}
                    >
                        <ul className="ps-tab-list">
                            <li className="active">
                                <>
                                    <a
                                        onClick={() =>
                                            props.dispatch(
                                                loginModelController(true)
                                            )
                                        }
                                    >
                                        {t('login')}
                                    </a>
                                </>
                            </li>

                            <li>
                                <>
                                    <a
                                        onClick={() =>
                                            props.dispatch(
                                                registerModelController(true)
                                            )
                                        }
                                    >
                                        {t('register')}
                                    </a>
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
                                    Log In Your Account
                                </h5>
                                <div className="form-group">
                                    <Form.Item
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your email!',
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
                                                message:
                                                    'Please input your password!',
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
                    <div
                        style={{
                            marginTop: '10px',
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
                                            }}
                                        />
                                    </span>{' '}
                                    {t('login_facebook')}
                                </button>
                            )}
                        />
                    </div>
                </div>
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}

export default connect(mapStateToProps)(Login);
