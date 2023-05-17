import React from 'react';
import { Progress } from 'antd';
import Link from 'next/link';
import { formatCurrency, getPriceUnit } from '~/utilities/product-helper';
import Rating from '~/components/elements/Rating';
import CountDown from '~/components/elements/CountDown';
import ThumbnailWithBadge from '~/components/elements/detail/thumbnail/ThumbnailWithBadge';
import useProduct from '~/hooks/useProduct';
import { useRouter } from 'next/router';
import useTranslation from '~/config/lang';

const ProductDealHot = ({ product }) => {
    const { thumbnailImage, price, badge } = useProduct();
    const router = useRouter();
    const { Translate: t } = useTranslation();
    return (
        <div className="ps-product--detail ps-product--hot-deal">
            <div className="ps-product__header">
                <ThumbnailWithBadge product={product} />
                <div className="ps-product__info">
                    <h5>Investor</h5>
                    <h3 className="ps-product__name">
                        <Link
                            href="/product/[pid]"
                            as={`/product/${product.id}`}
                        >
                            <a>{product.title}</a>
                        </Link>
                    </h3>

                    <div className="ps-product__meta">
                        {product.is_sale === true ? (
                            <h4 className="ps-product__price sale">
                                <del className="mr-2">
                                    {getPriceUnit(router?.locale)}{' '}
                                    {formatCurrency(product.sale_price)}{' '}
                                </del>
                                {getPriceUnit(router?.locale)}{' '}
                                {formatCurrency(product.price)}{' '}
                            </h4>
                        ) : (
                            <h4 className="ps-product__price">
                                {getPriceUnit(router?.locale)}{' '}
                                {formatCurrency(product.price)}{' '}
                            </h4>
                        )}
                        <div className="ps-product__rating">
                            <Rating />
                            <span>(1 review)</span>
                        </div>
                        <div className="ps-product__specification">
                            <p>
                                Status:
                                <strong className="in-stock">In Stock</strong>
                            </p>
                        </div>
                    </div>
                    <div className="ps-product__expires">
                        <p>Expires In</p>
                        <CountDown
                            timeTillDate="12 31 2021, 6:00 am"
                            timeFormat="MM DD YYYY, h:mm a"
                        />
                    </div>
                    <div className="ps-product__processs-bar">
                        <Progress percent={60} showInfo={false} />
                        <p>
                            <strong>4/79</strong> Sold
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDealHot;
