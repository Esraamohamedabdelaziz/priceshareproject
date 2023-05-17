import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';

import { Form, Input } from 'antd';
import { connect } from 'react-redux';

import AuthenticationService from '../../../services/AuthenticationService';
import {
    loginModelController,
    registerModelController,
} from '~/store/auth/action';
import useTranslation from '~/config/lang';

const ResetPassword = (props) => {
    const { Translate: t } = useTranslation();
    const authenticationService = new AuthenticationService();

    const [user, setUser] = React.useState({});

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

    const handleSubmit = (e) => {
        const authenticationService = new AuthenticationService();
        authenticationService.onResetPassword(e['email'], false);
    };

    if (typeof window !== 'undefined' && window.innerWidth >= 1200) {
        return (
            <div className="ps-my-account-login">
                <div className="containerForLoginAndRegister">
                    <Form
                        className="ps-form--account"
                        onFinish={(e) => handleSubmit(e, props)}
                    >
                        <ul className="ps-tab-list">
                            {/* <li className="active">
                                <Link href="/account/login">
                                    <a>Login</a>
                                </Link>
                            </li> */}
                            <li className="active">
                                <h2
                                    style={{
                                        color: 'black',
                                    }}
                                >
                                    Reset your Password
                                </h2>
                            </li>
                        </ul>
                        <div className="ps-tab active" id="sign-in">
                            <div className="ps-form__content">
                                <h5
                                    style={{
                                        color: 'black',
                                    }}
                                >
                                    Reset your password
                                </h5>
                                <div className="form-group">
                                    <Form.Item
                                        name="email"
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
                                            type="email"
                                            placeholder="email address"
                                        />
                                    </Form.Item>
                                </div>

                                <div className="form-group submit">
                                    <button
                                        type="submit"
                                        className="ps-btn ps-btn--fullwidth"
                                    >
                                        Submit
                                    </button>

                                    <div
                                        className="form-group submit"
                                        style={{
                                            marginTop: '10px',
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </Form>

                    <div
                        style={{
                            height: '700px',
                            marginTop: '50px',
                            width: '3px',
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            borderRadius: '10vh',
                        }}
                    />
                </div>
            </div>
        );
    } else {
        return (
            <div className="ps-my-account-login-register-layout">
                <div className="containerForLoginAndRegister">
                    <Form
                        className="ps-form--account"
                        onFinish={(e) => handleSubmit(e, props)}
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
                                    Reset your Password
                                </h5>
                                <div className="form-group">
                                    <Form.Item
                                        name="email"
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
                                            type="email"
                                            placeholder="email address"
                                        />
                                    </Form.Item>
                                </div>

                                <div className="form-group submit">
                                    <button
                                        type="submit"
                                        className="ps-btn ps-btn--fullwidth"
                                    >
                                        Submit
                                    </button>

                                    <div
                                        className="form-group submit"
                                        style={{
                                            marginTop: '10px',
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </Form>
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
export default connect(mapStateToProps)(ResetPassword);
