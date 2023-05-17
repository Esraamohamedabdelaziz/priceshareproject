import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Form, Input } from 'antd';
import { toast } from 'react-toastify';

class FormCheckoutInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        if (process.browser) {
            this.state = {
                username: JSON.parse(window.localStorage.getItem('userData'))[
                    'username'
                ],
                firstName: '',
                lastName: '',
                phone: '',
                address_1: '',
                address_2: '',
                city: '',
                shipping_zone_id: 1,
                postalCode: '',
            };
        }
    }

    //Functs
    componentDidUpdate(prevProps) {
        // const {shipping_address_firstname} = this.props?.addressData

        const zoneName = this.props?.zones?.find(z => z?.id==this.props?.addressData?.shipping_zone_id )?.name
        console.log(zoneName, 'shipping_address_firstname');
        if (
            this.props?.addressData?.shipping_address_firstname !==
            this.state.firstName
        ) {
            this.setState({
                firstName: this.props?.addressData?.shipping_address_firstname,
            });
        }  if (
            this.props?.addressData?.shipping_address_lastname !==
            this.state.lastName
        ) {
            this.setState({
                lastName: this.props?.addressData?.shipping_address_lastname,
            });
        }

        if (
            this.props?.addressData?.shipping_phone_number !==
            this.state.phone
        ) {
            this.setState({
                phone: this.props?.addressData?.shipping_phone_number,
            });
        }

         if (
            this.props?.addressData?.shipping_address_line1 !==
            this.state.address_1
        ) {
            this.setState({
                address_1: this.props?.addressData?.shipping_address_line1,
            });
        }

         if (
            this.props?.addressData?.shipping_address_line2 !==
            this.state.address_2
        ) {
            this.setState({
                address_2: this.props?.addressData?.shipping_address_line2,
            });
        }  if (
           zoneName!==
            this.state.city
        ) {
            this.setState({
                city: zoneName
            });  this.setState({
                shipping_zone_id: this.props?.addressData?.shipping_zone_id
            });
        }
    }

    setCheckoutReadyAddressLocalStorage() {
        window.localStorage.setItem(
            'reg_checkout_ready',
            JSON.stringify({ address_info: this.state })
        );
    }

    handleChangeUsername = (e) => {
        this.setState({ username: e.target.value });
    };

    handleChangeFirstName = (e) => {
        this.setState({ firstName: e.target.value });
    };
    handleChangeLastName = (e) => {
        this.setState({ lastName: e.target.value });
    };
    handleChangePhone = (e) => {
        this.setState({ phone: e.target.value });
    };
    handleChangeAddress1 = (e) => {
        this.setState({ address_1: e.target.value });
    };
    handleChangeAddress2 = (e) => {
        this.setState({ address_2: e.target.value });
    };
    handleChangeCity = (e) => {
        this.setState({ city: e.target.value });
    };
    handleChangePostalCode = (e) => {
        this.setState({ postalCode: e.target.value });
    };

    handleLoginSubmit = () => {console.log(this.props?.addressData,this.props?.addressData ==undefined,'this.props?.addressData');
        if(this.props?.addressData ==undefined){
toast.error('Please Select a address')
        }else{
            this.setCheckoutReadyAddressLocalStorage();
        Router.push('/account/shipping');
        }
    };

    render() {
        console.log(this.state, 'dsdwer');

        let checkoutLang = this.props.checkoutLang;
        return (
            <Form
                className="ps-form__billing-info"
                onFinish={this.handleLoginSubmit}
            >
                <h3 className="ps-form__heading">
                    {checkoutLang?.contact_info}
                </h3>
                <div className="form-group">
                    <Input
                        className="form-control"
                        type="text"
                        placeholder="Email or phone number"
                        value={this.state.username}
                        disabled={true}
                        onChange={this.handleChangeUsername}
                    />
                </div>
              
        

                  {this.props.children}
                <h3 className="ps-form__heading" style={{fontSize:'20px'}}>
                    {checkoutLang?.shipping_address}
                </h3>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <Input
                                className="form-control"
                                type="text"
                                placeholder={checkoutLang?.first_name}
                                value={this.state.firstName}
                                disabled={true}
                                onChange={this.handleChangeFirstName}
                            />
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                           <Input
                                    className="form-control"
                                    type="text"
                                    placeholder={checkoutLang?.last_name}
                                    value={this.state.lastName}
                                    disabled={true}
                                    onChange={this.handleChangeLastName}
                                />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                   <Input
                            className="form-control"
                            type="text"
                            placeholder={checkoutLang?.phone}
                            value={this.state.phone}
                            disabled={true}
                            onChange={this.handleChangePhone}
                        />
                </div>
                <div className="form-group">
                   <Input
                            className="form-control"
                            type="text"
                            placeholder={checkoutLang?.address}
                            value={this.state.address_1}
                            disabled={true}
                            onChange={this.handleChangeAddress1}
                        />
                </div>
                <div className="form-group">
                   
                        <Input
                            className="form-control"
                            type="text"
                            placeholder={checkoutLang?.apartment}
                            value={this.state.address_2}
                            disabled={true}
                            onChange={this.handleChangeAddress2}
                        />
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                          <Input
                                    className="form-control"
                                    type="city"
                                    placeholder={checkoutLang?.city}
                                    value={this.state.city}
                                    disabled={true}
                                    onChange={this.handleChangeCity}
                                />
                        </div>
                    </div>
                    {/* <div className="col-sm-6">
                        <div className="form-group">
                            <Input
                                    className="form-control"
                                    type="postalCode"
                                    placeholder={checkoutLang?.postal}
                                    value={this.state.postalCode}
                                    disabled={true}
                                    onChange={this.handleChangePostalCode}
                                />
                        </div>
                    </div> */}
                </div>
                {/* <div className="form-group">
                    <div className="ps-checkbox makeItFlex">
                        <input
                            className="form-control"
                            type="checkbox"
                            id="save-information"
                        />
                        <label
                            htmlFor="save-information"
                            style={{
                                color: 'black',
                            }}
                        >
                            {checkoutLang?.save}
                        </label>
                    </div>
                </div> */}
                        <div className="form-group">
                    <div className="ps-checkbox makeItFlex">
                        <input
                            className="form-control"
                            type="checkbox"
                            id="keep-update"
                        />
                        <label
                            htmlFor="keep-update"
                            style={{
                                color: 'black',
                            }}
                        >
                            {checkoutLang?.is_offers}
                        </label>
                    </div>
                </div>
                <div className="ps-form__submit">
                    <Link href="/account/shopping-cart">
                        <a>
                            <i className="icon-arrow-left mr-2"></i>
                            {checkoutLang?.return}
                        </a>
                    </Link>
                    <div className="ps-block__footer">
                        <button className="ps-btn">
                            {checkoutLang?.shipping}
                        </button>
                    </div>
                </div>
            </Form>
        );
    }
}

export default FormCheckoutInformation;
