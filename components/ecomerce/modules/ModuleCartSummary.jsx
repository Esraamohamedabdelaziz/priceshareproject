import React from 'react';
import Link from 'next/link';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import useTranslation from '~/config/lang';
import { useRouter } from 'next/router';
import { getPriceUnit } from '~/utilities/product-helper';

const ModuleCartSummary = ({ source }) => {
    const { Translate: t } = useTranslation();
    const router = useRouter();
    // View
    let productItemsView, amount;
    if (source && source.length > 0) {
        amount = calculateAmount(source);
        productItemsView = source.map((item) => (
            <li key={item.id}>
                <span className="ps-block__estimate">
                    <Link href="/product/[pid]" as={`/product/${item.id}`}>
                        <a className="ps-product__title">
                            {router.locale == 'ar' ? item.name_ar : item.name}
                            <br /> x {item.quantity}
                        </a>
                    </Link>
                </span>
            </li>
        ));
    }

    return (
        <>
            <div className="ps-block--shopping-total">
                <div className="ps-block__header">
                    <p style={{ display: 'block' }}>
                        {t('sub_total')}{' '}
                        <span>
                            {' '}
                            {getPriceUnit(router.locale)} {amount}
                        </span>
                    </p>
                </div>
                <div className="ps-block__content">
                    <ul className="ps-block__product">{productItemsView}</ul>
                    <h3 style={{ display: 'block' }}>
                        {t('total')}{' '}
                        <span>
                            {getPriceUnit(router.locale)} {amount}
                        </span>
                    </h3>
                </div>
            </div>
        </>
    );
};

export default ModuleCartSummary;
