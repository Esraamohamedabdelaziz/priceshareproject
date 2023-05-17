import axios from 'axios';
import GeneralService from './GeneralService';

export default class SupportService {
    onStartSelling(name, company_name, phone, email, description) {
        const generalService = new GeneralService();

        const apiUrl =
            generalService.domainURLAPIValue() + '/public-vendor-registration/';
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                'X-CSP':
                    generalService.domainURLValue() +
                    generalService.domainURLSchemaValue(),
                'X-CS': generalService.domainURLValue(),
            },
        };

        const body = {
            name,
            company_name,
            email,
            phone,
            description,
        };
        console.log(body);

        const res = axios
            .post(apiUrl, body, headers)
            .then((response) => {
                console.log(response);
                return 200;
            })
            .catch((error) => {
                console.log(error?.toString());
                if (error?.response?.status == 409) {
                    return 409;
                } else {
                    return 400;
                }
            });

        return res;
    }
    onContactUs(name, email, subject, message) {
        const generalService = new GeneralService();

        const apiUrl = generalService.domainURLAPIValue() + '/contact-us/';
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                'X-CS': generalService.domainURLValue(),
            },
        };

        const body = {
            name,
            subject,
            email,
            message,
        };
        console.log(body);

        const res = axios
            .post(apiUrl, body, headers)
            .then((response) => {
                console.log(response);
                return 200;
            })
            .catch((error) => {
                console.log(error);
                if (error?.response?.status == 409) {
                    return 409;
                } else {
                    return 400;
                }
            });

        return res;
    }
    onNewsSubscribe(email) {
        const generalService = new GeneralService();

        const apiUrl = generalService.domainURLAPIValue() + '/subscribe/';
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                'X-CS': generalService.domainURLValue(),
                'X-CSP':
                    generalService.domainURLValue() +
                    generalService.domainURLSchemaValue(),
            },
        };

        const body = {
            email,
        };
        console.log(body);

        const res = axios
            .post(apiUrl, body, headers)
            .then((response) => {
                console.log(response);
                return 200;
            })
            .catch((error) => {
                console.log(error);
                if (error?.response?.status == 409) {
                    return 409;
                } else {
                    return 400;
                }
            });

        return res;
    }
}
