import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import ProductOnCart from '~/components/elements/products/ProductOnCart';
import useEcomerce from '~/hooks/useEcomerce';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import { t } from 'i18next';
import useTranslation from '~/config/lang';
import { getPriceUnit } from '~/utilities/product-helper';
import { useRouter } from 'next/router';

const MiniCart = ({ ecomerce }) => {
    const { products, removeItem, removeItems, getProducts } = useEcomerce();
    const { Translate: t } = useTranslation();
    const router = useRouter();
    function handleRemoveItem(e, productId) {
        e.preventDefault();
        removeItem({ id: productId }, ecomerce.cartItems, 'cart');
    }

    useEffect(() => {
        console.log(ecomerce.cartItems);
        getProducts(ecomerce.cartItems, 'cart');
        console.log(products);
    }, [ecomerce]);

    let cartItemsView;
    if (products && products.length > 0) {
        const amount = calculateAmount(products);
        const productItems = products.map((item) => {
            return (
                <ProductOnCart product={item} key={item.id}>
                    <a
                        className="ps-product__remove"
                        onClick={(e) => handleRemoveItem(e, item.id)}
                    >
                        <i className="icon-cross"></i>
                    </a>
                </ProductOnCart>
            );
        });
        cartItemsView = (
            <div className="ps-cart__content">
                <div className="ps-cart__items">{productItems}</div>
                <div className="ps-cart__footer">
                    <h3 style={{ color: 'black' }}>
                        {t('sub_total')}:
                        <strong>
                            {getPriceUnit(router.locale)} {amount ? amount : 0}
                        </strong>
                    </h3>
                    <figure>
                        <Link href="/account/shopping-cart">
                            <a className="ps-btn">{t('view_cart')}</a>
                        </Link>
                        <Link href="/account/checkout">
                            <a className="ps-btn">{t('checkout')}</a>
                        </Link>
                    </figure>
                </div>
            </div>
        );
    } else {
        cartItemsView = (
            <div className="ps-cart__content">
                <div className="ps-cart__items">
                    <span
                        style={{
                            color: 'black',
                        }}
                    >
                        No products in cart
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="ps-cart--mini">
            <a
                className="header__extra"
                href="#"
                style={{
                    color: 'white',
                }}
            >
                <i className="icon-bag2"></i>
                <span>
                    <i>{products ? products.length : 0}</i>
                </span>
            </a>
            {cartItemsView}
        </div>
    );
};

export default connect((state) => state)(MiniCart);
