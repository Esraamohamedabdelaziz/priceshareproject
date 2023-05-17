import React, { useEffect, useState } from 'react';
import FormCheckoutInformation from './modules/FormCheckoutInformation';
import ModulePaymentOrderSummary from '~/components/partials/account/modules/ModulePaymentOrderSummary';
import Router, { useRouter } from 'next/router';
import { loginModelController } from '~/store/auth/action';
import { useDispatch } from 'react-redux';
import useTranslation from '~/config/lang';
import AddressesService from '~/services/AddressesService';
import { Button, Select } from 'antd';

const Checkout = () => {
    const dispatch = useDispatch();
    const { Translate: t } = useTranslation();
    const addressesService = new AddressesService();
    const [address, setAddress] = useState([]);
        const [zones, setZones] = useState([]);

    const [loading, setLoading] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const router = useRouter();
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
        if (
            !JSON.parse(localStorage.getItem('userData')) ||
            !JSON.parse(localStorage.getItem('userData'))?.token
        ) {
            dispatch(loginModelController(true));
        }

        getAddresses();
          getZones();
    }, []);

    const checkoutLang = t('checkout_page');
    return (
        <div className="ps-checkout ps-section--shopping">
            <div className="container">
                <div className="ps-section__header">
                    <h1
                        style={{
                            color: 'black',
                        }}
                    >
                        {checkoutLang?.title}
                    </h1>
                </div>
                <div className="ps-section__content">
                    <div className="ps-form--checkout">
                        <div className="ps-form__content">
                            <div className="row">
                                <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                   
                                    <FormCheckoutInformation
                                        checkoutLang={checkoutLang}
                                        zones={zones}
                                        addressData={address?.find(
                                            (data) => data.id == selectedAddress
                                        )}
                                    >
                                         <h3 className="ps-form__heading" style={{fontSize:'20px'}}>
                                        Choose Address <Button onClick={()=>{
                                            router?.push('/addresses')
                                        }} style={{marginLeft: '10px'}} type="link">Create one?</Button>
                                    </h3>
                                    <Select
                                        size="large"
                                        style={{
                                            width: '100%',
                                            marginBottom: '40px',
                                        }}
                                        value={selectedAddress}
                                        status={!selectedAddress && 'error'}
                                        onChange={(e) => {
                                            setSelectedAddress(e);
                                        }}
                                        placeholder="Address"
                                    >
                                        {address?.map((address) => {
                                            return (
                                                <Select.Option
                                                    value={address?.id}
                                                >
                                                    {`${address?.shipping_address_firstname} ${address?.shipping_address_firstname}, ${address?.shipping_phone_number}, ${address?.shipping_address_line1}`}
                                                </Select.Option>
                                            );
                                        })}
                                    </Select>
                                    </FormCheckoutInformation>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  ps-block--checkout-order">
                                    <div className="ps-form__orders">
                                        <h3>{checkoutLang?.your_order}</h3>
                                        <ModulePaymentOrderSummary
                                            shipping={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
