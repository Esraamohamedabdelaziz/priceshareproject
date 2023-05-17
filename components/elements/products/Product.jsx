import React from 'react';
import Link from 'next/link';
import ModuleProductActions from '~/components/elements/products/modules/ModuleProductActions';
import useProduct from '~/hooks/useProduct';
import Rating from '~/components/elements/Rating';
import useTranslation from '~/config/lang';

const Product = ({ product }) => {
    const { thumbnailImage, price, badge, title, rating } = useProduct();
    const { Translate: t } = useTranslation();

    return (
        <div className="ps-product">
            <div className="ps-product__thumbnail">
                <Link href="/product/[pid]" as={`/product/${product.id}`}>
                    <a>{thumbnailImage(product)}</a>
                </Link>
                {badge(product)}
                <ModuleProductActions product={product} />
            </div>
            <div className="ps-product__container">
                <div className="product-vendor-container">
                    <Link href="/product/[pid]" as={`/product/${product.id}`}>
                        <a className="ps-product__vendor">
                            {product.vendor_name}
                        </a>
                    </Link>
                </div>
                <div className="ps-product__content">
                    {title(product)}
                    <div className="ps-product__rating">
                        <Rating rating={product.rating} />
                        <span>{product.rating_count}</span>
                    </div>
                    {price(product)}
                </div>
                <div className="ps-product__content hover">
                    {title(product)}
                    {price(product)}
                </div>
            </div>
        </div>
    );
};

export default Product;
