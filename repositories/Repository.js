import axios from 'axios';

const baseDomain = 'http://localhost:1337'; // API for products
export const basePostUrl = 'http://localhost:1337'; // API for post
export const baseStoreURL = 'http://localhost:1337'; // API for vendor(store)
import GeneralService from '../services/GeneralService';

const generalService = new GeneralService();

export const customHeaders = {
    Accept: 'application/json',
    'X-CSP':
        generalService.domainURLValue() + generalService.domainURLSchemaValue(),
    'X-CS': generalService.domainURLValue(),
    'Content-Type': 'application/json',
};

export const base = generalService.domainURLAPIValue();

export const baseUrl = `${baseDomain}`;

export default axios.create({
    base,
    headers: customHeaders,
});

export const serializeQuery = (query) => {
    return Object.keys(query)
        .map(
            (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join('&');
};
