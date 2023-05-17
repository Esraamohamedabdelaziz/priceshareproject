import React, { useState } from 'react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';

import { Form, Input, message } from 'antd';
import { connect } from 'react-redux';

import AuthenticationService from '../../../services/AuthenticationService';
import {
    loginModelController,
    registerModelController,
} from '~/store/auth/action';
import useTranslation from '~/config/lang';
import { toast } from 'react-toastify';

const ResetPasswordUid = (props) => {
    const authenticationService = new AuthenticationService();
    const { Translate: t } = useTranslation();
    const [user, setUser] = React.useState({});
    const router = useRouter();

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
        const uid = router.query?.uid;
        const token = router.query?.token;
        const authenticationService = new AuthenticationService();
        authenticationService
            .onResetNewPassword(e['new_password'], token, uid)
            .then((data) => {
                console.log(data, 'dataaa');
                if (data == 200) {
                    toast.success(
                        'Password reset successfully, you can now log in.'
                    );
                } else {
                    toast.error('Pls try again!');
                }
            });
    };

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
                                    name="new_password"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your new password!',
                                        },
                                    ]}
                                >
                                    <Input
                                        className="form-control"
                                        type="password"
                                        placeholder="New Password"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="confirm"
                                    dependencies={['new_password']}
                                    hasFeedback
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
                                                    getFieldValue(
                                                        'new_password'
                                                    ) === value
                                                ) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    new Error(
                                                        'The two passwords that you entered do not match!'
                                                    )
                                                );
                                            },
                                        }),
                                    ]}
                                >
                                    <Input
                                        className="form-control"
                                        type="password"
                                        placeholder="Confirm Password"
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
};
function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}
export default connect(mapStateToProps)(ResetPasswordUid);
