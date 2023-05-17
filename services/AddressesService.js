import axios from 'axios';
import GeneralService from './GeneralService';

export default class AddessesService {
    getAddresses() {
        const generalService = new GeneralService();

        const apiUrl =
            generalService.domainURLAPIValue() +
            '/addresses/?page=1&max_page=1000';
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
    getZones() {
        const generalService = new GeneralService();

        const apiUrl =
            generalService.domainURLAPIValue() +
            '/public-shipping-zone/?page=1&max_page=1000';
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

    onCreate(e) {
        const generalService = new GeneralService();

        const apiUrl = generalService.domainURLAPIValue() + '/addresses/';
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

        const res = axios
            .post(apiUrl, body, headers)
            .then((response) => {
                window.location.reload();
                return 200;
                // this.dispatch(handleLogin(data));
                // this.history.push('../dashboard/ecommerce');
            })
            .catch((e) => {
                return e.response.status;
                /*if (e.response.status === 400) {
                    notification['error']({
                        message: 'Wrong password',
                        description: 'Enter the correct password!',
                    });
                }*/
            });
        return res;
    }
    onEdit(e) {
        const generalService = new GeneralService();

        const apiUrl =
            generalService.domainURLAPIValue() + `/addresses/${e?.id}/`;
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

        const res = axios
            .put(apiUrl, body, headers)
            .then((response) => {
                window.location.reload();
                return 200;
                // this.dispatch(handleLogin(data));
                // this.history.push('../dashboard/ecommerce');
            })
            .catch((e) => {
                return e.response.status;
                /*if (e.response.status === 400) {
                    notification['error']({
                        message: 'Wrong password',
                        description: 'Enter the correct password!',
                    });
                }*/
            });
        return res;
    }

    onDelete(e) {
        const generalService = new GeneralService();

        const apiUrl =
            generalService.domainURLAPIValue() + `/addresses/${e?.id}/`;
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

        const res = axios
            .delete(apiUrl, headers)
            .then((response) => {
                window.location.reload();
                return 200;
                // this.dispatch(handleLogin(data));
                // this.history.push('../dashboard/ecommerce');
            })
            .catch((e) => {
                return e.response.status;
                /*if (e.response.status === 400) {
                    notification['error']({
                        message: 'Wrong password',
                        description: 'Enter the correct password!',
                    });
                }*/
            });
        return res;
    }
}
