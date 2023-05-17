import React, { useState } from 'react';
import { Form, Input, Progress, Rate } from 'antd';
import Rating from '~/components/elements/Rating';
import useProduct from '~/hooks/useProduct';
import CheckoutService from '~/services/CheckoutService';
import { toast } from 'react-toastify';
import { loginModelController } from '~/store/auth/action';
import { useDispatch } from 'react-redux';

const PartialReview = ({ product }) => {
    const { rating } = useProduct();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const checkoutService = new CheckoutService();

    const { TextArea } = Input;

    const handleSubmit = async (e) => {
        const token = JSON.parse(localStorage.getItem('userData'))?.token;
        if (!token || token == 'undefined') {
            dispatch(loginModelController(true));
        } else {
            setLoading(true);
            await checkoutService
                .createReview({ ...e, product_id: product.id })
                .then((response) => {
                    setLoading(false);
                    if (response > 399) {
                        toast.error('Something wrong pls try again');
                    } else {
                        window.location.reload();
                    }
                });
        }
    };
    console.log(
        product.rating_count,
        parseFloat((product.rating_5 / product.rating_count) * 100),
        'product.rating_count'
    );
    return (
        <div className="row">
            <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 ">
                <div className="ps-block--average-rating">
                    <div className="ps-block__header">
                        <h3>
                            {product.rating ? product.rating?.toFixed(2) : 0.0}
                        </h3>
                        <Rating rating={product.rating} />

                        <span>{product.rating_count} Reviews</span>
                    </div>
                    <div className="ps-block__star">
                        <span style={{ marginRight: '20px' }}>5 Star</span>
                        <Progress
                            percent={
                                product.rating_count != 0
                                    ? parseFloat(
                                          (product.rating_5 /
                                              product.rating_count) *
                                              100
                                      )?.toFixed(2)
                                    : 0
                            }
                        />
                        {/* <div
                            className="ps-progress"
                            data-value={
                                product.rating_count != 0
                                    ? parseFloat(
                                          (product.rating_5 /
                                              product.rating_count) *
                                              100
                                      )
                                    : 0
                            }
                        >
                            <span></span>
                        </div> */}
                        {/* <span>
                            {product.rating_count != 0
                                ? parseFloat(
                                      (product.rating_5 /
                                          product.rating_count) *
                                          100
                                  )
                                : 0}
                            %
                        </span> */}
                    </div>
                    <div className="ps-block__star">
                        <span style={{ marginRight: '20px' }}>4 Star</span>
                        <Progress
                            percent={
                                product.rating_count != 0
                                    ? parseFloat(
                                          (product.rating_4 /
                                              product.rating_count) *
                                              100
                                      )?.toFixed(2)
                                    : 0
                            }
                        />
                    </div>
                    <div className="ps-block__star">
                        <span style={{ marginRight: '20px' }}>3 Star</span>
                        <Progress
                            percent={
                                product.rating_count != 0
                                    ? parseFloat(
                                          (product.rating_3 /
                                              product.rating_count) *
                                              100
                                      )?.toFixed(2)
                                    : 0
                            }
                        />
                    </div>
                    <div className="ps-block__star">
                        <span style={{ marginRight: '20px' }}>2 Star</span>
                        <Progress
                            percent={
                                product.rating_count != 0
                                    ? parseFloat(
                                          (product.rating_2 /
                                              product.rating_count) *
                                              100
                                      )?.toFixed(2)
                                    : 0
                            }
                        />
                    </div>
                    <div className="ps-block__star">
                        <span style={{ marginRight: '20px' }}>1 Star</span>
                        <Progress
                            percent={
                                product.rating_count != 0
                                    ? parseFloat(
                                          (product.rating_1 /
                                              product.rating_count) *
                                              100
                                      )?.toFixed(2)
                                    : 0
                            }
                        />
                    </div>
                </div>
            </div>
            <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 ">
                <></>
                <Form
                    className="ps-form--review"
                    onFinish={(e) => handleSubmit(e)}
                >
                    <h4>Submit Your Review</h4>
                    <p>
                        Your email address will not be published. Required
                        fields are marked
                        <sup>*</sup>
                    </p>
                    <div className="form-group form-group__rating">
                        <label>Your rating of this product</label>
                        <Form.Item
                            style={{ marginBottom: 0 }}
                            name="rating"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your rate!',
                                    type: 'number',
                                },
                            ]}
                        >
                            <Rate />
                        </Form.Item>
                    </div>
                    <div className="form-group">
                        <Form.Item
                            name="comment"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your comment!',
                                },
                            ]}
                        >
                            <TextArea
                                rows="6"
                                type="text"
                                placeholder="Write your review"
                            />
                        </Form.Item>
                    </div>
                    {/* <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  ">
                            <div className="form-group">
                                 <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your name!',
                                        type: 'text',
                                    },
                                ]}
                            >
                                <Input
                                    className="form-control"
                                    type="text"
                                    placeholder="Your Name"
                                />
                            </Form.Item>
                                
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  ">
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
                                    placeholder="Email address"
                                />
                            </Form.Item>
                            </div>
                        </div>
                    </div> */}
                    <div className="form-group submit">
                        <button className="ps-btn" type="submit">
                            Submit Review
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default PartialReview;
