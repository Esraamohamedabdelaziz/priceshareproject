import React from 'react';
import Link from 'next/link';
import useTranslation from '~/config/lang';
import { useRouter } from 'next/router';

const ModuleProductDetailSpecification = ({ product }) => {
    const { Translate: t } = useTranslation();
    const router = useRouter();
    return (
        <div className="ps-product__specification">
            <>
                <a className="report" href="/contact-us">
                    Report Abuse
                </a>
            </>
            <p>
                <strong>SKU:</strong> {product.sku ? product.sku : ''}
            </p>
            <p className="categories">
                <strong> {t('categories')}:</strong>
                {product?.categories?.map((category) => {
                    return (
                        <Link href={`/shop?category=${category.id}`}>
                            <a>
                                {router.locale == 'ar'
                                    ? category.name_ar
                                    : category.name}
                            </a>
                        </Link>
                    );
                })}
            </p>
            <p className="tags">
                <strong> Tags</strong>
                {product?.tags?.map((tag) => {
                    return (
                        <>
                            <a>
                                {router.locale == 'ar' ? tag.name_ar : tag.name}
                            </a>
                        </>
                    );
                })}
            </p>
        </div>
    );
};

export default ModuleProductDetailSpecification;
