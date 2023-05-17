import React from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';
import { getPriceUnit } from '~/utilities/product-helper';
import { useRouter } from 'next/router';

const ProductOnCart = ({ product, children }) => {
    const router = useRouter();
    const { thumbnailImage, title } = useProduct();

    return (
        <div className="ps-product--cart-mobile">
            <div className="ps-product__thumbnail">
                <Link href="/product/[pid]" as={`/product/${product.id}`}>
                    <a>{thumbnailImage(product)}</a>
                </Link>
            </div>
            <div className="ps-product__content">
                {title(product)}
                <p>
                    <small>
                        <del>
                            {product.sale_price
                                ? getPriceUnit(router.locale) + product.price
                                : ''}
                        </del>{' '}
                        {getPriceUnit(router.locale)}
                        {product.sale_price
                            ? product.sale_price
                            : product.price}{' '}
                        x {product.quantity}
                    </small>
                </p>{' '}
                {children}
            </div>
        </div>
    );
};

export default ProductOnCart;
