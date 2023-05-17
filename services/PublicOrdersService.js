import axios from 'axios';
import GeneralService from './GeneralService';

export default class SupportService {
    getPublicOrders() {
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

        const res = axios
            .get(apiUrl, headers)
            .then((response) => {
                console.log(response, 'dataaadataaa');
                return response.data;
            })
            .catch((error) => {
                console.log(error?.toString());
                return error.response.status;
            });

        return res;
    }

    getSinglePublicOrders(orderId) {
        const generalService = new GeneralService();

        const apiUrl =
            generalService.domainURLAPIValue() + `/public-orders/${orderId}/`;
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

        const res = axios
            .get(apiUrl, headers)
            .then((response) => {
                console.log(response, 'dataaadataaa');
                return response.data;
            })
            .catch((error) => {
                console.log(error?.toString());
                return error.response.status;
            });

        return res;
    }
}
