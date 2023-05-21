import { Button, Form, Input, Modal, Select, Typography } from 'antd';
import { useRouter } from 'next/router';
import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { getNameLang, getTextLang } from '~/components/shared/panel/PanelMenu';
import useTranslation from '~/config/lang';
import useEcomerce from '~/hooks/useEcomerce';
import { getPriceUnit } from '~/utilities/product-helper';
import AddressesService from '../../../services/AddressesService';

export function formatDate(date) {
    let dateCreation = new Date(date);
    return `${dateCreation.getFullYear()}-${
        dateCreation.getMonth() + 1
    }-${dateCreation.getDate()} ${dateCreation.getHours()}:${dateCreation.getMinutes()}`;
}

const AddressesList = ({ ecomerce }) => {
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState([]);
    const [selectedZone, setSelectedZone] = useState();
    const [zones, setZones] = useState([]);
    const addressesService = new AddressesService();
    const { Translate: t } = useTranslation();
    const [selectedAddress, setSelectedAddress] = useState(null);
    const { Title, Text } = Typography;

    const addressLang = t('addresses');
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setSelectedAddress(null);
        setIsModalOpen(false);
    };

    console.log(zones, 'zones');

    async function getAddresses() {
        setLoading(true);
        try {
            let responseData;
            responseData = await addressesService.getAddresses();

            setAddress(responseData?.addresses);
            return responseData;
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }
    async function getZones() {
        setLoading(true);
        try {
            let responseData;
            responseData = await addressesService.getZones();

            setZones(responseData?.results);
            return responseData;
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAddresses();
        getZones();
    }, []);
    useEffect(() => {
        setSelectedZone(selectedAddress?.shipping_zone_id);
    }, [selectedAddress]);

    console.log(selectedAddress, 'address');
    const handleSubmit = async (e) => {
        if (selectedZone) {
            let res;
            if (selectedAddress) {
                res = await addressesService
                    .onEdit({
                        ...selectedAddress,
                        ...e,
                        shipping_zone_id: selectedZone,
                    })
                    .then((res) => {
                        if (res > 399) {
                            toast.error('Something Wrong pls try again');
                        }
                    });
            } else {
                res = await addressesService
                    .onCreate({ ...e, shipping_zone_id: selectedZone })
                    .then((res) => {
                        if (res > 399) {
                            toast.error('Something Wrong pls try again');
                        }
                    });
            }

            return res;
        }
    };
    console.log(addressLang, 'addressLang');

    // views
    let publicOrderstemsView;
    publicOrderstemsView = (
        <div className="table-responsive">
            <table className="table ps-table--whishlist">
                <thead>
                    <tr>
                        <th>{addressLang?.zone}</th>
                        <th>{addressLang?.name}</th>
                        <th>{addressLang?.phone}</th>
                        <th>{addressLang?.address}</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {address?.map((address, index) => {
                        const zone = zones?.find(
                            (data) => data.id == address?.shipping_zone_id
                        );
                        return (
                            <tr key={index}>
                                <td>{getNameLang(zone)}</td>
                                <td>
                                    {address?.shipping_address_firstname +
                                        ' ' +
                                        address?.shipping_address_lastname}
                                </td>

                                <td>{address?.shipping_phone_number}</td>
                                <td>{address?.shipping_address_line1}</td>
                                <td>
                                    <Button
                                        type="link"
                                        onClick={() => {
                                            setSelectedAddress(address);
                                            setIsModalOpen(true);
                                        }}
                                    >
                                        Edit
                                    </Button>{' '}
                                    <Button
                                        type="link"
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            await addressesService
                                                .onDelete(address)
                                                .then((res) => {
                                                    if (res > 399) {
                                                        toast.error(
                                                            'Something Wrong pls try again'
                                                        );
                                                    }
                                                });
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
    return (
        <div className="ps-section--shopping ps-whishlist">
            <div className="container">
                <div className="ps-section__header">
                    <h1
                        style={{
                            color: 'black',
                        }}
                    >
                        {addressLang?.address}
                    </h1>
                    <Button onClick={showModal}>Add Address</Button>
                </div>
                <div className="ps-section__content">
                    {publicOrderstemsView}
                </div>
            </div>
            {isModalOpen && (
                <Modal
                    title="Create Address"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form
                        className="ps-form--account"
                        onFinish={handleSubmit}
                        initialValues={selectedAddress}
                    >
                        <div className="ps-tab active" id="register">
                            <div className="ps-form__content">
                                <div className="form-group">
                                    <Form.Item
                                        name="shipping_address_firstname"
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
                                </div>{' '}
                                <div className="form-group">
                                    <Form.Item
                                        name="shipping_address_lastname"
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
                                        name="shipping_phone_number"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your Phone!',
                                            },
                                        ]}
                                    >
                                        <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="Phone"
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group form-forgot">
                                    <Form.Item
                                        name="shipping_address_line1"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your address 1!',
                                            },
                                        ]}
                                    >
                                        <Input
                                            className="form-control"
                                            type="address 1"
                                            placeholder="Address 1"
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group form-forgot">
                                    <Form.Item
                                        name="shipping_address_line2"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Please input your address 2!',
                                            },
                                        ]}
                                    >
                                        <Input
                                            className="form-control"
                                            type="address 2"
                                            placeholder="Address 2"
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <Select
                                        size="large"
                                        style={{ width: '100%' }}
                                        value={selectedZone}
                                        status={!selectedZone && 'error'}
                                        onChange={(e) => {
                                            setSelectedZone(e);
                                        }}
                                        placeholder={addressLang?.zone}
                                    >
                                        {zones?.map((zone) => {
                                            return (
                                                <Select.Option value={zone?.id}>
                                                    {getNameLang(zone)}
                                                </Select.Option>
                                            );
                                        })}
                                    </Select>
                                </div>
                                <div className="form-group submit">
                                    <button
                                        type="submit"
                                        className="ps-btn ps-btn--fullwidth"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </Modal>
            )}
        </div>
    );
};
export default connect((state) => state)(AddressesList);
