import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import ModuleEcomerceCartItems from '~/components/ecomerce/modules/ModuleEcomerceCartItems';
import ModuleCartSummary from '~/components/ecomerce/modules/ModuleCartSummary';
import useTranslation from '~/config/lang';

const ShoppingCart = ({ source }) => {
    const [cartItems, setCartItems] = useState(null);
    const { Translate: t } = useTranslation();
    useEffect(() => {
        if (source && source.length > 0) {
            setCartItems(source);
        }
    }, [source]);

    return (
        <div className="ps-section--shopping ps-shopping-cart">
            <div className="container">
                <div className="ps-section__header">
                    <h1 style={{ color: 'black' }}>{t('shopping_cart')}</h1>
                </div>
                <div className="ps-section__content">
                    <ModuleEcomerceCartItems cartItems={cartItems} />

                    <div className="ps-section__cart-actions">
                        <Link href="/shop">
                            <a>
                                <i className="icon-arrow-left mr-2"></i>
                                {t('back_shop')}
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="ps-section__footer">
                    <div className="row justify-content-end">
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                            <ModuleCartSummary source={cartItems} />
                            <Link href="/account/checkout">
                                <a className="ps-btn ps-btn--fullwidth">
                                    {t('proceed_checkout')}
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
