import axios from 'axios';
import GeneralService from './GeneralService';
import cookies from 'js-cookie';

export default class CheckoutService {
    calculateShippingFee(product_ids, shipping_zone_id) {
        const generalService = new GeneralService();

        const apiUrl =
            generalService.domainURLAPIValue() + '/calculate-shipping/';
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${
                    JSON.parse(localStorage.getItem('userData'))?.token
                }`,
                'X-CSP':
                    generalService.domainURLValue() +
                    generalService.domainURLSchemaValue(),
                'X-CS': generalService.domainURLValue(),
            },
        };

        const body = { product_ids, shipping_zone_id };
        console.log(body);

        const res = axios
            .post(apiUrl, body, headers)
            .then((response) => {
                console.log(response.data);
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                return error.response.status;
            });

        return res;
    }

    createOrder(product_ids_quantities, shipping_info, payment_method) {
        const generalService = new GeneralService();

        const apiUrl = generalService.domainURLAPIValue() + '/public-orders/';
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${
                    JSON.parse(localStorage.getItem('userData'))?.token
                }`,
                'X-CSP':
                    generalService.domainURLValue() +
                    generalService.domainURLSchemaValue(),
                'X-CS': generalService.domainURLValue(),
            },
        };

        console.log(product_ids_quantities);
        console.log(shipping_info);
        console.log(payment_method);
        const body = {
            product_ids_quantities: JSON.stringify(product_ids_quantities),
            shipping_zone_id: shipping_info.shipping_zone_id,
            shipping_address_firstname: shipping_info.firstName,
            shipping_address_lastname: shipping_info.lastName,
            shipping_phone_number: shipping_info.phone,
            shipping_address_line1: shipping_info.address_1,
            shipping_address_line2: shipping_info.address_2,
            payment_method_codename: payment_method,
        };
        console.log(body);

        const res = axios
            .post(apiUrl, body, headers)
            .then((response) => {
                console.log(response.data);
                cookies.remove('cart');
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                return error.response;
            });

        return res;
    }
    createReview(e) {
        const generalService = new GeneralService();

        const apiUrl = generalService.domainURLAPIValue() + '/product-rating/';
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${
                    JSON.parse(localStorage.getItem('userData'))?.token
                }`,
                'X-CSP':
                    generalService.domainURLValue() +
                    generalService.domainURLSchemaValue(),
                'X-CS': generalService.domainURLValue(),
            },
        };

        const body = e;
        console.log(body);

        const res = axios
            .post(apiUrl, body, headers)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                return error.response.status;
            });

        return res;
    }
}
