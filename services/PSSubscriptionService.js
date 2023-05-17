import axios from 'axios';
import GeneralService from './GeneralService';

export default class PSSubscriptionService {
    onPSSubscribe(shareable_link, amount_paid) {
        const generalService = new GeneralService();

        const apiUrl = generalService.domainURLAPIValue() + '/ps-subscription/';
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

        const body = { shareable_link, amount_paid };
        console.log(body);

        const res = axios
            .post(apiUrl, body, headers)
            .then((response) => {
                console.log(response);
                window.localStorage.setItem(
                    'ps_checkout_done',
                    JSON.stringify(response.data)
                );
                window.localStorage.removeItem('ps_checkout_ready');
                return 200;
            })
            .catch((error) => {
                console.log(error);
                return error.response.status;
            });

        return res;
    }

    onPSURLCheck(shareable_link) {
        const generalService = new GeneralService();

        const apiUrl =
            generalService.domainURLAPIValue() + '/ps-subscription-url-check/';
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                'X-CS': generalService.domainURLValue(),
                'X-CSP':
                    generalService.domainURLValue() +
                    generalService.domainURLSchemaValue(),
            },
        };

        const body = { shareable_link: shareable_link };
        console.log(body);

        const res = axios
            .post(apiUrl, body, headers)
            .then((response) => {
                console.log(response);
                window.localStorage.setItem(
                    'ps_checkout_ready',
                    JSON.stringify(response.data)
                );
                return 200;
            })
            .catch((error) => {
                console.log(error);
                if (error?.response?.status == 406) {
                    return 406;
                } else if (error?.response?.status == 400) {
                    return 400;
                }
            });

        return res;
    }

    getSubscriptions() {
        const generalService = new GeneralService();

        const apiUrl = generalService.domainURLAPIValue() + '/ps-subscription/';
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
                console.log(response);
                return response;
            })
            .catch((error) => {
                console.log(error);
                return error.response.status;
            });

        return res;
    }
}
