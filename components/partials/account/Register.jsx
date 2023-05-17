import React, { Component, useState } from 'react';
import Link from 'next/link';
// import Router from 'next/router';
// import { login } from '../../../store/auth/action';

import { Form, Input } from 'antd';
import { connect } from 'react-redux';

import AuthenticationService from '../../../services/AuthenticationService';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import Router from 'next/router';
import {
    loginModelController,
    registerModelController,
} from '~/store/auth/action';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { registerationMessage: '', color: 'red', width: 0 };
    }

    handleSubmit = (e) => {
        const authenticationService = new AuthenticationService();
        authenticationService.onRegister(
            e['email'],
            e['first_name'],
            e['last_name'],
            e['phone'],
            e['password'],
            false
        );

        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
        //         this.props.dispatch(login());
        //         Router.push('/account/login');
        //     } else {
        //     }
        // });
    };

    updateDimensions = () => {
        this.setState({ width: window.innerWidth });
    };
    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    onFacebookLogin = async (e) => {
        console.log(e);

        const authenticationService = new AuthenticationService();
        const res_promise = authenticationService.onRegister(
            e['email'],
            e['first_name'],
            e['last_name'],
            'dummy_password',
            true
        );
        const res = await res_promise.then((res) => {
            if (res == 409) {
                this.setState({
                    registerationMessage:
                        'Email is already registered. Try to login instead.',
                    color: 'red',
                });
            } else if (res == 400) {
                this.setState({
                    registerationMessage:
                        'Registration unsuccessful, please try again!',
                    color: 'red',
                });
            } else {
                this.setState({
                    registerationMessage:
                        'Registration successful, you can now log in!',
                    color: 'green',
                });
            }
            return res;
        });
        console.log(res);
    };

    render() {
        // if(this.state.width >= 1200){
        //     onClick={()=>dispatch(loginModelController(true))}
        // }
        return (
            <div className="ps-my-account-login-register-layout">
                <div className="containerForLoginAndRegister">
                    <Form
                        className="ps-form--account"
                        onFinish={this.handleSubmit.bind(this)}
                    >
                        <ul className="ps-tab-list">
                            <li>
                                <>
                                    <a
                                        onClick={() =>
                                            this.props.dispatch(
                                                loginModelController(true)
                                            )
                                        }
                                    >
                                        {t('login')}
                                    </a>
                                </>
                            </li>
                            <li className="active">
                                <>
                                    <a
                                        onClick={() =>
                                            this.props.dispatch(
                                                registerModelController(true)
                                            )
                                        }
                                    >
                                        {t('register')}
                                    </a>
                                </>
                            </li>
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
                                                message:
                                                    'Please input your last name!',
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
                                                message:
                                                    'Please input your email!',
                                            },
                                        ]}
                                    >
                                        <Input
                                            className="form-control"
                                            // type="email"
                                            placeholder={t('email_fields')}
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
                                <div className="form-group form-forgot">
                                    <Form.Item
                                        name="confirm_password"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please confirm your password!',
                                            },
                                        ]}
                                    >
                                        <Input
                                            className="form-control"
                                            type="password"
                                            placeholder="Confirm password..."
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group submit">
                                    <button
                                        type="submit"
                                        className="ps-btn ps-btn--fullwidth"
                                    >
                                        {t('register')}
                                    </button>

                                    <div
                                        className="form-group submit"
                                        style={{
                                            marginTop: '10px',
                                        }}
                                    >
                                        <FacebookLogin
                                            appId="1135885293954326"
                                            fields="first_name,last_name,email"
                                            scope="email"
                                            callback={this.onFacebookLogin}
                                            render={(renderProps) => (
                                                <button
                                                    onClick={
                                                        renderProps.onClick
                                                    }
                                                    type="submit"
                                                    className="ps-btn ps-btn--fullwidthFacebook"
                                                >
                                                    <span>
                                                        <img
                                                            src="/static/img/facebookIcon.png"
                                                            style={{
                                                                width: '9px',
                                                                objectFit:
                                                                    'fill',
                                                            }}
                                                        />
                                                    </span>{' '}
                                                    Register with Facebook
                                                </button>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                            {this.state.registerationMessage && (
                                <p style={{ color: this.state.color }}>
                                    {this.state.registerationMessage}
                                </p>
                            )}
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state.auth;
};
export default connect(mapStateToProps)(Register);
