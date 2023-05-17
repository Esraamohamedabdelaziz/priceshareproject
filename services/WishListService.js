import axios from 'axios';
import GeneralService from './GeneralService';

export default class WishListService {
    addProductToWishlist(pid) {
        const generalService = new GeneralService();

        const apiUrl = generalService.domainURLAPIValue() + '/wishlist/';
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

        const body = { product_id: pid };
        console.log(body);

        const res = axios
            .post(apiUrl, body, headers)
            .then((response) => {
                console.log(response);
                return 200;
            })
            .catch((error) => {
                console.log(error);
                return error.response.status;
            });

        return res;
    }

    deleteProductfromWishlist(pid) {
        const generalService = new GeneralService();

        const apiUrl =
            generalService.domainURLAPIValue() + '/wishlist/' + pid + '/';
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
            .delete(apiUrl, headers)
            .then((response) => {
                console.log(response);
                return 200;
            })
            .catch((error) => {
                console.log(error);
                return error.response.status;
            });

        return res;
    }

    getProductsFromWishlist() {
        const generalService = new GeneralService();

        console.log('trigered');
        const apiUrl = generalService.domainURLAPIValue() + '/wishlist/';
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
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                return error.response.status;
            });

        return res;
    }
}
