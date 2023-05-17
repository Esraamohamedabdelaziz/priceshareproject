import axios from 'axios';
import stores from '~/public/static/data/stores';

export default class GeneralService {
    domainURLAPIValue(devMode = true) {
        if (devMode) {
            return 'http://localhost:8000';
        } else {
            return 'https://app.priceshare.com/api';
        }
    }

    domainURLValue(devMode = true) {
        if (devMode) {
            return 'localhost';
        } else {
            return 'priceshare.com';
        }
    }

    domainURLSchemaValue(devMode = true) {
        if (process.browser) {
            if (JSON.parse(window.localStorage.getItem('store'))) {
                return JSON.parse(window.localStorage.getItem('store'))[
                    'domain_url'
                ];
            } else {
                console.log('fallback to us store');
                if (devMode) {
                    return stores.stores[1].domain_url;
                } else {
                    return stores.stores[0].domain_url;
                }
            }
        }
    }

    getStores() {
        const generalService = new GeneralService();
        const apiUrl = generalService.domainURLAPIValue() + '/public-stores/';
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                'X-CSP':
                    generalService.domainURLValue() +
                    generalService.domainURLSchemaValue(),
                'X-CS': this.domainURLValue(),
            },
        };

        const res = axios
            .get(apiUrl, headers)
            .then((response) => {
                console.log(response);
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                return error.response.status;
            });

        return res;
    }

    getVendor(vendor) {
        const generalService = new GeneralService();
        const apiUrl =
            generalService.domainURLAPIValue() + `/public-vendors/${vendor}/`;
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                'X-CSP':
                    generalService.domainURLValue() +
                    generalService.domainURLSchemaValue(),
                'X-CS': this.domainURLValue(),
            },
        };

        const res = axios
            .get(apiUrl, headers)
            .then((response) => {
                console.log(response);
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                return error.response.status;
            });

        return res;
    }

    getBanners() {
        const generalService = new GeneralService();
        const apiUrl =
            generalService.domainURLAPIValue() + '/public-cms-media-display/';
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                'X-CSP':
                    generalService.domainURLValue() +
                    generalService.domainURLSchemaValue(),
                'X-CS': this.domainURLValue(),
            },
        };

        const res = axios
            .get(apiUrl, headers)
            .then((response) => {
                console.log(response);
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                return error.response.status;
            });

        return res;
    }
}
