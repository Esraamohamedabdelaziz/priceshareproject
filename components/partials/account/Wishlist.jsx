import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import useEcomerce from '~/hooks/useEcomerce';
import ProductCart from '~/components/elements/products/ProductCart';
import WishListService from '../../../services/WishListService';
import useTranslation from '~/config/lang';
import { getPriceUnit } from '~/utilities/product-helper';
import { useRouter } from 'next/router';

const Wishlist = ({ ecomerce }) => {
    const { loading, products, getProducts } = useEcomerce();
    const { addItem, removeItem } = useEcomerce();
    const wishlistService = new WishListService();
    const { Translate: t } = useTranslation();
    const router = useRouter();
    async function getWishlistProducts() {
        let responseData;
        responseData = await wishlistService.getProductsFromWishlist();
        console.log(responseData);
        return responseData;
    }

    function handleAddItemToCart(e, product) {
        e.preventDefault();
        addItem({ id: product.id, quantity: 1 }, ecomerce.cartItems, 'cart');
    }

    function handleRemoveWishlistItem(e, product) {
        e.preventDefault();
        removeItem(product, ecomerce.wishlistItems, 'wishlist');
        getWishlistProducts().then((responseData) => {
            getProducts(responseData);
            getProducts(ecomerce.wishlistItems);
        });
    }

    useEffect(() => {
        if (ecomerce.wishlistItems.length > 0) {
            getProducts(ecomerce.wishlistItems);
        } else {
            getWishlistProducts().then((responseData) => {
                console.log('dataaa');
                console.log(responseData);
                getProducts(responseData);
            });
        }
    }, [ecomerce]);

    // views
    let wishlistItemsView;
    if (products && products.length > 0) {
        wishlistItemsView = (
            <div className="table-responsive">
                <table className="table ps-table--whishlist">
                    <thead>
                        <tr>
                            <th></th>
                            <th>{t('name')}</th>
                            <th>{t('price')}</th>
                            <th>{t('vendor')}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    <a
                                        href="#"
                                        onClick={(e) =>
                                            handleRemoveWishlistItem(e, product)
                                        }
                                    >
                                        <i className="icon-cross"></i>
                                    </a>
                                </td>
                                <td>
                                    <ProductCart product={product} />
                                </td>
                                <td className="price">
                                    <del>
                                        {product.sale_price
                                            ? getPriceUnit(router.locale) +
                                              product.price
                                            : ''}
                                    </del>
                                    &nbsp; {getPriceUnit(router.locale)}
                                    {product.sale_price
                                        ? product.sale_price
                                        : product.price}
                                </td>
                                <td>{product.vendor_name}</td>
                                <td>
                                    <a
                                        className="ps-btn"
                                        href=""
                                        onClick={(e) =>
                                            handleAddItemToCart(e, product)
                                        }
                                    >
                                        {t('add_to_cart')}
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    } else {
        if (!loading) {
            wishlistItemsView = (
                <div className="alert alert-danger makeItFlex" role="alert">
                    {t('wishlist_empty')}
                </div>
            );
        }
    }
    return (
        <div className="ps-section--shopping ps-whishlist">
            <div className="container">
                <div className="ps-section__header">
                    <h1
                        style={{
                            color: 'black',
                        }}
                    >
                        {t('wishlist')}
                    </h1>
                </div>
                <div className="ps-section__content">{wishlistItemsView}</div>
            </div>
        </div>
    );
};
export default connect((state) => state)(Wishlist);
