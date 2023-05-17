import { Button } from 'antd';
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

const PublicOrders = ({ ecomerce }) => {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const publicOrdersService = new PublicOrdersService();
    const { Translate: t } = useTranslation();
    const router = useRouter();
    async function getPublicOrders() {
        setLoading(true);
        try {
            let responseData;
            responseData = await publicOrdersService.getPublicOrders();

            setOrders(responseData);
            return responseData;
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getPublicOrders();
    }, []);

    // views
    let publicOrderstemsView;
    if (orders && orders?.results?.length > 0) {
        publicOrderstemsView = (
            <div className="table-responsive">
                <table className="table ps-table--whishlist">
                    <thead>
                        <tr>
                            <th>{t('ID')}</th>
                            <th>{t('total')}</th>
                            <th>{t('date')}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.results?.map((order) => (
                            <tr key={order.id}>
                                <td>{order?.id}</td>
                                <td className="price">
                                    {order?.order_total}{' '}
                                    {getPriceUnit(router.locale)}
                                </td>
                                <td>{formatDate(order?.created_on)}</td>
                                <td>
                                    <Button
                                        onClick={() => {
                                            router.push(
                                                `/account/orders/${order?.id}`
                                            );
                                        }}
                                    >
                                        {t('details')}
                                    </Button>
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
                <div className="ps-section__header">
                    <h1
                        style={{
                            color: 'black',
                        }}
                    >
                        {t('orders')}
                    </h1>
                </div>
                <div className="ps-section__content">
                    {publicOrderstemsView}
                </div>
            </div>
        </div>
    );
};
export default connect((state) => state)(PublicOrders);
