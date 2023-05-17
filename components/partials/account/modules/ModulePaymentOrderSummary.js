import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import useEcomerce from '~/hooks/useEcomerce';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import CheckoutService from '../../../../services/CheckoutService';
import Router, { useRouter } from 'next/router';
import useTranslation from '~/config/lang';
import { getPriceUnit } from '~/utilities/product-helper';

const ModulePaymentOrderSummary = ({ ecomerce, shipping }) => {
    const { products, getProducts } = useEcomerce();
    const [shippingList, setShippingList] = useState([]);
    const [totalShippingFee, setTotalShippingFee] = useState(0);
    const { Translate: t } = useTranslation();
    const router = useRouter();
    useEffect(async () => {
        const checkoutService = new CheckoutService();
        if (ecomerce.cartItems) {
            getProducts(ecomerce.cartItems, 'cart');
        }

        if (shipping) {
            console.log('shipping found');
            console.log(products);
            if (products && products.length > 0) {
                console.log('productss');
                let product_ids = [];
                for (let i = 0; i < products.length; i++) {
                    product_ids.push(products[i].id);
                }
                let total_shipping = 0;
                await checkoutService
                    .calculateShippingFee(JSON.stringify(product_ids), 1)
                    .then((response) => {
                        console.log(response);
                        setShippingList(response);
                        for (let i = 0; i < shippingList.length; i++) {
                            total_shipping =
                                total_shipping + shippingList[i].shipping_fee;
                        }
                        setTotalShippingFee(total_shipping);
                    });
            }
        }
    }, [ecomerce]);

    // view
    let listItemsView, shippingView, totalView;
    let amount;
    if (products && products.length > 0) {
        amount = calculateAmount(products);
        listItemsView = products.map((item) => (
            <Link href="/" key={item.id}>
                <a className="makeItFlexWithDir" href={'/product/' + item.id}>
                    <strong>
                        {router.locale == 'ar' ? item.name_ar : item.name}
                        <span>x{item.quantity}</span>
                    </strong>
                    <small>
                        {getPriceUnit(router.locale)}
                        {item.quantity *
                            (item.sale_price ? item.sale_price : item.price)}
                    </small>
                </a>
            </Link>
        ));
    } else {
        listItemsView = <p>{t('no_product')}</p>;
    }
    if (shipping === true) {
        shippingView = shippingList.map((item) => (
            <figure>
                <figcaption>
                    <strong>
                        <a href="#">
                            {router.locale == 'ar' ? item.name_ar : item.name}
                        </a>{' '}
                        Shipping Fee
                    </strong>
                    <small>${item.shipping_fee}</small>
                </figcaption>
            </figure>
        ));

        totalView = (
            <figure className="ps-block__total">
                <h3>
                    {t('total')}
                    <strong>
                        {getPriceUnit(router.locale)}
                        {parseInt(amount) +
                            (totalShippingFee ? totalShippingFee : 0)}
                        .00
                    </strong>
                </h3>
            </figure>
        );
    } else {
        totalView = (
            <figure className="ps-block__total">
                <h3>
                    {t('total')}
                    <strong>
                        {getPriceUnit(router.locale)}
                        {parseInt(amount)}.00
                    </strong>
                </h3>
            </figure>
        );
    }
    return (
        <div className="ps-block--checkout-order">
            <div className="ps-block__content">
                <figure>
                    <figcaption>
                        <strong>{t('product')}</strong>
                        <strong>{t('total')}</strong>
                    </figcaption>
                </figure>
                <figure className="ps-block__items makeItFlexDir">
                    {listItemsView}
                </figure>
                <figure>
                    <figcaption>
                        <strong>{t('sub_total')}</strong>
                        <small>
                            {getPriceUnit(router.locale)}
                            {amount}
                        </small>
                    </figcaption>
                </figure>
                {shippingView}
                {totalView}
            </div>
        </div>
    );
};
export default connect((state) => state)(ModulePaymentOrderSummary);
