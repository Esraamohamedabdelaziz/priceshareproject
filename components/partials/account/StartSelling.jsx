import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useDispatch } from 'react-redux';
import Router, { useRouter } from 'next/router';
import {
    login,
    loginModelController,
    registerModelController,
} from '~/store/auth/action';
import { Space, Typography } from 'antd';
import SupportService from '~/services/SupportService';
import useTranslation from '~/config/lang';

const StartSelling = ({ samePageRefresh = false }) => {
    const [loading, setLoading] = useState(false);
    const { Translate: t } = useTranslation();
    const dispatch = useDispatch();
    const router = useRouter();
    const [user, setUser] = React.useState({
        isLoggedIn: false,
        user: {},
        errorMsg: '',
        startSellingMessage: '',
        color: 'red',
    });
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        setLoading(true);
        setUser({
            ...user,
            startSellingMessage: '',
            color: 'red',
        });
        const supportService = new SupportService();
        const res = await supportService
            .onStartSelling(
                e['name'],
                e['company_name'],
                e['phone'],
                e['email'],
                e['description']
            )
            .then((res) => {
                console.log(res);
                setLoading(false);
                if (res == 409) {
                    setUser({
                        ...user,
                        startSellingMessage: t('request_already_send'),
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
                        startSellingMessage: 'Request sent successfully!',
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

    const { Title, Text } = Typography;
    const { TextArea } = Input;

    return (
        <>
            <Form
                className="ps-form--account"
                onFinish={(e) => handleSubmit(e)}
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
                                level="2"
                                style={{
                                    margin: 0,
                                    fontSize: '25px',
                                    fontWeight: '300',
                                }}
                            >
                                {t('sell_on_priceshare')}
                            </Title>
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
                            Fill form to start selling
                        </h5>

                        <div className="form-group">
                            <Form.Item
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your name!',
                                    },
                                ]}
                            >
                                <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="Full Name"
                                />
                            </Form.Item>
                        </div>
                        <div className="form-group">
                            <Form.Item
                                name="company_name"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please input your company name!',
                                    },
                                ]}
                            >
                                <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="Company Name"
                                />
                            </Form.Item>
                        </div>
                        <div className="form-group">
                            <Form.Item
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please input your Phone Number!',
                                    },
                                ]}
                            >
                                <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="Phone Number"
                                />
                            </Form.Item>
                        </div>
                        <div className="form-group">
                            <Form.Item
                                name="email"
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
                                    placeholder="email address"
                                />
                            </Form.Item>
                        </div>
                        <div className="form-group">
                            <Form.Item
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please input your description!',
                                    },
                                ]}
                            >
                                <TextArea
                                    // className="form-control"
                                    type="text"
                                    placeholder="What are you selling?"
                                />
                            </Form.Item>
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
                        {user.startSellingMessage && (
                            <p style={{ color: user.color }}>
                                {user.startSellingMessage}
                            </p>
                        )}
                        <div className="form-group submit">
                            <button
                                type="submit"
                                className="ps-btn ps-btn--fullwidth"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </Form>
        </>
    );
};

export default StartSelling;
