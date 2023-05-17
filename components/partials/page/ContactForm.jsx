import { Form, Input } from 'antd';
import React from 'react';
import { useState } from 'react';
import SupportService from '~/services/SupportService';

const ContactForm = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = React.useState({
        isLoggedIn: false,
        user: {},
        errorMsg: '',
        contactUsMessage: '',
        color: 'red',
    });
    const { TextArea } = Input;
    const handleSubmit = async (e) => {
        setLoading(true);
        setUser({
            ...user,
            contactUsMessage: '',
            color: 'red',
        });
        const supportService = new SupportService();
        const res = await supportService
            .onContactUs(e['name'], e['subject'], e['email'], e['message'])
            .then((res) => {
                console.log(res);
                setLoading(false);
                if (res == 409) {
                    setUser({
                        ...user,
                        contactUsMessage:
                            'Email is already registered. Try to login instead.',
                        color: 'red',
                    });
                } else if (res == 400) {
                    setUser({
                        registerationMessage: 'unsuccessful, please try again!',
                        color: 'red',
                    });
                } else {
                    setUser({
                        ...user,
                        contactUsMessage: 'Message sent successfully!',
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

    return (
        <div className="ps-contact-form">
            <div className="container">
                <Form
                    className="ps-form--contact-us"
                    onFinish={(e) => handleSubmit(e)}
                >
                    <h3 style={{ color: 'black' }}>Get In Touch</h3>
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
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
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
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
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                            <div className="form-group">
                                <Form.Item
                                    name="subject"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your subject!',
                                        },
                                    ]}
                                >
                                    <Input
                                        className="form-control"
                                        type="text"
                                        placeholder="Subject"
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                            <div className="form-group">
                                <Form.Item
                                    name="message"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Please input your message!',
                                        },
                                    ]}
                                >
                                    <TextArea
                                        // className="form-control"
                                        type="text"
                                        placeholder="Message"
                                    />
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                    {loading ? (
                        <div className="form-group" align="center">
                            <img src="/static/loading.gif" />
                        </div>
                    ) : (
                        ''
                    )}
                    {user.contactUsMessage && (
                        <p style={{ color: user.color }}>
                            {user.contactUsMessage}
                        </p>
                    )}
                    <div className="form-group submit">
                        <button className="ps-btn" type="submit">
                            Send message
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default ContactForm;
