import { Button, Descriptions } from 'antd';
import { useRouter } from 'next/router';
import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import useTranslation from '~/config/lang';
import useEcomerce from '~/hooks/useEcomerce';
import { getPriceUnit } from '~/utilities/product-helper';
import PublicOrdersService from '../../../services/PublicOrdersService';

export function formatDate(date) {
    let dateCreation = new Date(date);
    return `${dateCreation.getFullYear()}-${
        dateCreation.getMonth() + 1
    }-${dateCreation.getDate()} ${dateCreation.getHours()}:${dateCreation.getMinutes()}`;
}

const SinglePublicOrders = ({ ecomerce }) => {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [orderData, setOrderData] = useState([]);
    const publicOrdersService = new PublicOrdersService();
    const { Translate: t } = useTranslation();
    const router = useRouter();
    async function getPublicOrders() {
        setLoading(true);
        try {
            let responseData;
            responseData = await publicOrdersService.getSinglePublicOrders(
                router.query.id
            );

            setOrderData(responseData);
            return responseData;
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (router.query.id) getPublicOrders(router.query.id);
    }, [router.query]);

    console.log(orderData, 'orderData');

    // views
    let publicOrderstemsView;
    if (orderData) {
        publicOrderstemsView = (
            <div className="table-responsive">
                <Descriptions title={`Order ${orderData?.id}`}>
                    <Descriptions.Item label="User Name">{`${orderData?.shipping_address_firstname} ${orderData?.shipping_address_lastname}`}</Descriptions.Item>
                    <Descriptions.Item label="Telephone">
                        {orderData?.shipping_phone_number}
                    </Descriptions.Item>
                    <Descriptions.Item label="Total">
                        {orderData?.order_total}
                    </Descriptions.Item>
                    <Descriptions.Item label="SubTotal">
                        {orderData?.order_subtotal}
                    </Descriptions.Item>
                    <Descriptions.Item label="Zone">
                        {orderData?.shipping_zone}
                    </Descriptions.Item>
                    <Descriptions.Item label="Address">
                        {orderData?.shipping_address_line1}
                    </Descriptions.Item>
                </Descriptions>
                <table className="table ps-table--whishlist">
                    <thead>
                        <tr>
                            <th>{t('ID')}</th>
                            <th>{t('price')}</th>
                            <th>{t('name')}</th>
                            <th>{t('quantity')}</th>
                            <th>{t('total')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderData?.items?.map((item) => (
                            <tr key={item.id}>
                                <td>{item?.id}</td>
                                <td className="price">
                                    {item?.item_price}{' '}
                                    {getPriceUnit(router.locale)}
                                </td>
                                <td>{item?.name}</td>
                                <td>{item?.quantity}</td>

                                <td
                                    style={{ textAlign: 'center' }}
                                    className="price"
                                >
                                    {item?.total_price}{' '}
                                    {getPriceUnit(router.locale)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    } else {
        if (!loading) {
            publicOrderstemsView = (
                <div className="alert alert-danger makeItFlex" role="alert">
                    {t('orders_empty')}
                </div>
            );
        }
    }
    return (
        <div className="ps-section--shopping ps-whishlist">
            <div className="container">
                {/* <div className="ps-section__header">
                    <h1
                        style={{
                            color: 'black',
                        }}
                    >
                        Order {orderData?.id}
                    </h1>
                </div> */}
                <div className="ps-section__content">
                    {publicOrderstemsView}
                </div>
            </div>
        </div>
    );
};
export default connect((state) => state)(SinglePublicOrders);
