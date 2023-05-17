import React, { useEffect } from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';

import PageContainer from '~/components/layouts/PageContainer';

import FooterDefault from '~/components/shared/footers/FooterDefault';

import Newletters from '~/components/partials/commons/Newletters';

import { connect } from 'react-redux';

import useEcomerce from '~/hooks/useEcomerce';

import ModuleEcomerceCartItems from '~/components/ecomerce/modules/ModuleEcomerceCartItems';

import Link from 'next/link';

import ModuleCartSummary from '~/components/ecomerce/modules/ModuleCartSummary';
import useTranslation from '~/config/lang';

const ShoppingCartScreen = ({ ecomerce }) => {
    const { products, getProducts } = useEcomerce();
    const { Translate: t } = useTranslation();
    useEffect(() => {
        if (ecomerce.cartItems) {
            getProducts(ecomerce.cartItems, 'cart');
        }
    }, [ecomerce]);

    const breadCrumb = [
        {
            text: 'Home',

            url: '/',
        },

        {
            text: t('shopping_cart'),
        },
    ];

    // View

    let contentView;

    if (products) {
        if (products.length > 0) {
            contentView = (
                <>
                    <div className="ps-section__content">
                        <ModuleEcomerceCartItems cartItems={products} />

                        <div className="ps-section__cart-actions">
                            <Link href="/shop">
                                <a className="ps-btn">{t('back_shop')}</a>
                            </Link>
                        </div>
                    </div>

                    <div className="ps-section__footer">
                        <div className="row justify-space-between">
                            <div className="col-xl-8 col-lg-4 col-md-12 col-sm-12 col-12 ">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <figure>
                                            <figcaption
                                                style={{
                                                    color: 'black',
                                                }}
                                            >
                                                {t('coupon_discount')}
                                            </figcaption>

                                            <div className="form-group">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    placeholder={`${t(
                                                        'enter_coupon'
                                                    )}...`}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <button className="ps-btn ps-btn--outline">
                                                    {t('apply')}
                                                </button>
                                            </div>
                                        </figure>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                                <ModuleCartSummary source={products} />

                                <Link href="/account/checkout">
                                    <a className="ps-btn ps-btn--fullwidth">
                                        {t('proceed_checkout')}
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            );
        } else {
            contentView = (
                <>
                    <div className="ps-section__content">
                        <div className="alert alert-info">
                            <p className="mb-0">
                                Your cart is currently empty.
                            </p>
                        </div>

                        <div className="ps-section__cart-actions">
                            <Link href="/shop">
                                <a className="ps-btn">{t('back_shop')}</a>
                            </Link>
                        </div>
                    </div>
                </>
            );
        }
    } else {
    }

    return (
        <>
            <PageContainer
                footer={<FooterDefault />}
                title={t('shopping_cart')}
            >
                <div className="ps-page--simple">
                    <BreadCrumb breacrumb={breadCrumb} />

                    <div className="ps-section--shopping ps-shopping-cart">
                        <div className="container">
                            <div className="ps-section__header">
                                <h1
                                    style={{
                                        color: 'black',
                                    }}
                                >
                                    {t('shopping_cart')}
                                </h1>
                            </div>

                            {contentView}
                        </div>
                    </div>
                </div>

                {/* <Newletters layout="container" /> */}
            </PageContainer>
        </>
    );
};

export default connect((state) => state)(ShoppingCartScreen);
