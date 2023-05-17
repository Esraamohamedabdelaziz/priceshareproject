import React, { Component, useState, useEffect } from 'react';
import { Table, Divider, Tag, Progress, message, Button } from 'antd';
import Router, { useRouter } from 'next/router';

import PSSubscriptionService from '../../../../services/PSSubscriptionService';
import { loginModelController } from '~/store/auth/action';
import { useDispatch } from 'react-redux';
import { getPriceUnit } from '~/utilities/product-helper';
import { toast } from 'react-toastify';
import useTranslation from '~/config/lang';

const TableWallet = () => {
    const [packages, setPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState('');
    const [selectedPackageIndex, setSelectedPackageIndex] = useState(0);
    const [walletBalance, setWalletBalance] = useState(0);
    const router = useRouter();
    const { Translate: t } = useTranslation();
    const dispatch = useDispatch();
    const walletLang = t('wallect_section');
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text);
        toast.success('Invitation Link Copied!');
    }

    const tableColumn1 = [
        {
            title: walletLang.invitation_link,
            dataIndex: 'subscriber_link',
            key: 'subscriber_link',
        },
        {
            title: walletLang.value,
            dataIndex: 'subscriber_amount_paid',
            key: 'subscriber_amount_paid',
        },
        {
            title: walletLang.date_redeemed,
            dataIndex: 'subscriber_date',
            key: 'subscriber_date',
            render: (text) => <a>{text}</a>,
            width: '100px',
        },
        {
            title: walletLang.redeemed_by,
            dataIndex: 'subscriber_username',
            key: 'subscriber_username',
        },
    ];

    useEffect(async () => {
        const psSubscriptionService = new PSSubscriptionService();
        console.log('oncee');
        try {
            await psSubscriptionService.getSubscriptions().then((response) => {
                // not logged in then send to log in
                if (response == 403) {
                    dispatch(loginModelController(true));
                } else {
                    console.log(response.data);
                    setPackages(response.data.results);
                    setSelectedPackage(response.data.results[0]);
                    setWalletBalance(response.data.wallet_balance);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleClickPackage = (package_index) => {
        setSelectedPackage(packages[package_index]);
        setSelectedPackageIndex(package_index);
    };

    const tabsList = packages.map((ps_package, index) => (
        <th onClick={() => handleClickPackage(index)}>
            <h5
                style={
                    index == selectedPackageIndex
                        ? {
                              padding: '10px',
                              cursor: 'pointer',
                              color: '#1890ff',
                          }
                        : { padding: '10px', cursor: 'pointer' }
                }
            >
                {walletLang.package} {index + 1} (
                {ps_package.package_percent_complete}%)
            </h5>
        </th>
    ));

    return (
        <>
            <div className="form-group">
                <h4>
                    {walletLang?.wallet_balance}:{' '}
                    <span
                        style={{
                            fontWeight: '700',
                            color: '#52c41a',
                        }}
                    >
                        {walletBalance} {getPriceUnit(router.locale)}
                    </span>
                </h4>
            </div>
            <table
                className="table-bordered"
                style={{
                    display: 'block',
                    overflowX: 'auto',
                }}
            >
                {tabsList}
            </table>
            <br />

            {selectedPackage ? (
                <div>
                    <h5 style={{ color: '#000' }}>
                        {walletLang.invitation_link}:&nbsp;&nbsp;&nbsp;
                        <a>
                            https://priceshare.com/ps/priceshare-url-check/?sl=/
                            {selectedPackage.package_invitation_link_code}
                        </a>
                        <Button
                            style={{ marginLeft: '10px' }}
                            onClick={() => {
                                copyToClipboard(
                                    `https://priceshare.com/ps/priceshare-url-check/?sl=/${selectedPackage.package_invitation_link_code}`
                                );
                            }}
                        >
                            <i className="fa fa-copy" />
                        </Button>
                    </h5>
                </div>
            ) : (
                ''
            )}

            <div className="ps-product__processs-bar">
                <Progress
                    percent={
                        selectedPackage
                            ? selectedPackage.package_percent_complete
                            : 0
                    }
                    showInfo={true}
                />
                <p>
                    <strong>
                        {selectedPackage
                            ? selectedPackage.subscribers.length
                            : 0}{' '}
                        /{' '}
                        {selectedPackage
                            ? selectedPackage.package_num_invitations
                            : 0}
                    </strong>{' '}
                    &nbsp;{walletLang.invitation_redeemed}
                </p>
            </div>
            {packages.length > 0 ? (
                <Table
                    columns={tableColumn1}
                    style={{
                        display: 'block',
                        overflowX: 'auto',
                    }}
                    dataSource={
                        selectedPackage ? selectedPackage.subscribers : []
                    }
                />
            ) : (
                <p>
                    <strong>
                        {walletLang.not_subscribe}
                        <a href="/ps/priceshare-url-check">
                            {walletLang.click_subscribe}
                        </a>
                        , {walletLang.or}
                        <a href="/ps/priceshare-packages">
                            {walletLang.click_more}
                        </a>
                    </strong>
                </p>
            )}
        </>
    );
};

export default TableWallet;
