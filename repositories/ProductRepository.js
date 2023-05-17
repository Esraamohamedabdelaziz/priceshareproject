import Repository, { base, baseUrl, serializeQuery } from './Repository';
import axios from 'axios';

class ProductRepository {
    /*async getRecords(params) {
        const reponse = await Repository.get(
            `${baseUrl}/products?${serializeQuery(params)}`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({error: JSON.stringify(error)}));
        return reponse;
    }*/

    /*async getProducts(params) {
        const reponse = await Repository.get(
            `${baseUrl}/products?${serializeQuery(params)}`
        )
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    return response.data;
                } else {
                    return null;
                }
            })

            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }*/

    /*async getBrands() {
        const reponse = await Repository.get(`${baseUrl}/brands`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }*/

    /*async getProductCategories() {
        const reponse = await Repository.get(`${baseUrl}/product-categories`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({error: JSON.stringify(error)}));
        return reponse;
    }

    async getTotalRecords() {
        const reponse = await Repository.get(`${baseUrl}/products/count`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({error: JSON.stringify(error)}));
        return reponse;
    }*/

    /*async getProductsById(payload) {
        const reponse = await Repository.get(`${baseUrl}/products/${payload}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({error: JSON.stringify(error)}));
        return reponse;
    }*/

    /*async getProductsByCategory(payload) {
        const reponse = await Repository.get(
            `${baseUrl}/product-categories?slug=${payload}`
        )
            .then((response) => {
                if (response.data) {
                    if (response.data.length > 0) {
                        return response.data[0];
                    }
                } else {
                    return null;
                }
            })
            .catch(() => {
                return null;
            });
        return reponse;
    }

    async getProductsByBrand(payload) {
        const reponse = await Repository.get(
            `${baseUrl}/brands?slug=${payload}`
        )
            .then((response) => {
                if (response.data) {
                    if (response.data.length > 0) {
                        return response.data[0];
                    }
                } else {
                    return null;
                }
            })
            .catch(() => {
                return null;
            });
        return reponse;
    }

    async getProductsByIds(payload) {
        const endPoint = `${baseUrl}/products?${payload}`;
        const reponse = await Repository.get(endPoint)
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }*/

    // starting new APIs
    async getCategories() {
        const reponse = await Repository.get(`${base}/public-categories/`, {
            data: null,
        })
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getBrands() {
        const reponse = await Repository.get(`${base}/public-brands/`, {
            data: null,
        })
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async filterProducts(payload) {
        console.log(base);
        // const endPoint = `${base}/public-products?page=${payload.page}&max_page=${payload.max_page}&cat=${payload.category}&brand=${payload.brand}&max_p=${payload.price_lt}&min_p=${payload.price_gt}&sort_by=${payload.sort_by}&q=${payload.q}&top_match=${false}`;
        const reponse = await Repository.get(
            `${base}/public-products/?page=${payload.page}&max_page=${
                payload.max_page
            }&cat=${payload.category}&brand=${payload.brand}&max_p=${
                payload.price_lt
            }&min_p=${payload.price_gt}&sort_by=${payload.sort_by}&q=${
                payload.q
            }&top_match=${false}&filter_vendor_id=${payload.filter_vendor_id}`,
            { data: null }
        )
            .then((response) => {
                if (response.data && response.data.results.length > 0) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }

    async filterProductsAlsoBought(pid) {
        const reponse = await Repository.get(`${base}/also-bought/${pid}/`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }

    async filterProductsRelated(pid) {
        const reponse = await Repository.get(`${base}/related-products/${pid}/`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }

    async filterProductsOtherSellers(pid) {
        const reponse = await Repository.get(`${base}/other-sellers/${pid}/`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }

    async getProductsById(pid) {
        const reponse = await Repository.get(`${base}/public-products/${pid}/`)
            .then((response) => {
                console.log(response);
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    // homepage
    async filterProductsFeatured() {
        const reponse = await Repository.get(
            `${base}/customer-home-top-featured/`
        )
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }

    // homepage
    async filterProductsCategories(category_id, filter_str, vendor_id) {
        const reponse = await Repository.get(
            `${base}/customer-home-top-filter/?category_id=${category_id}&filter_str=${filter_str}&vendor_id=${vendor_id}`
        )
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }

    // homepage
    async filterProductsNewArrivals(category_id) {
        // console.log(category_id);
        // console.log(filter_str);
        const reponse = await Repository.get(
            `${base}/customer-home-top-new/?category_id=${category_id}`
        )
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }
}

export default new ProductRepository();
