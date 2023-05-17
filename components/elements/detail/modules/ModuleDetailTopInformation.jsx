import React from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';
import useTranslation from '~/config/lang';
import { useRouter } from 'next/router';
import { getPriceUnit } from '~/utilities/product-helper';
import Rating from '../../Rating';

const ModuleDetailTopInformation = ({ product }) => {
    const { rating } = useProduct();
    const { Translate: t } = useTranslation();
    const router = useRouter();
    // Views
    let priceView;

    if (product.is_sale) {
        priceView = (
            <h4 className="ps-product__price sale">
                <del className="mr-2">
                    {getPriceUnit(router?.locale)} {product.price}
                </del>
                ${product.sale_price}
            </h4>
        );
    } else {
        priceView = (
            <h4 className="ps-product__price">
                {getPriceUnit(router?.locale)} {product.price}
            </h4>
        );
    }
    return (
        <header className="product-fullwidth-header">
            <h1>{router.locale == 'ar' ? product.name_ar : product.name}</h1>
            <div className="ps-product__meta">
                <p>
                    {t('brand')}: {product?.brand_name}
                    <Link href="/shop">
                        <a className="ml-2 text-capitalize">{product.vendor}</a>
                    </Link>
                </p>
                <div className="ps-product__rating">
                    <Rating rating={product.rating} />
                    <span>{product.rating_count}</span>
                </div>
            </div>
            {priceView}
        </header>
    );
};

export default ModuleDetailTopInformation;
