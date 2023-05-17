import React from 'react';
import Link from 'next/link';
import { StrapiProductThumbnail } from '~/utilities/product-helper';
import ModuleProductWideActions from '~/components/elements/products/modules/ModuleProductWideActions';
import useProduct from '~/hooks/useProduct';
import useTranslation from '~/config/lang';

const ProductWide = ({ product }) => {
    const { thumbnailImage, price, title, badge } = useProduct();
    const { Translate: t } = useTranslation();
    return (
        <div className="ps-product ps-product--wide makeItFlex">
            <div className="ps-product__thumbnail">
                <Link href="/product/[pid]" as={`/product/${product.id}`}>
                    <a>{thumbnailImage(product)}</a>
                </Link>
            </div>
            <div className="ps-product__container">
                <div className="ps-product__content makeItFlexWithDir">
                    {title(product)}
                    <p className="ps-product__vendor makeItFlexWithDir">
                        {t('sold_by')}:
                        <Link href={`/store/${product.vendor_id}`}>
                            <a>&nbsp; {product.vendor_name}</a>
                        </Link>
                    </p>
                    <ul className="ps-product__desc makeItFlexWithDir">
                        {/*<li>Unrestrained and portable active stereo speaker</li>
                        <li> Free from the confines of wires and chords</li>
                        <li> 20 hours of portable capabilities</li>
                        <li>
                            Double-ended Coil Cord with 3.5mm Stereo Plugs
                            Included
                        </li>
                        <li> 3/4″ Dome Tweeters: 2X and 4″ Woofer: 1X</li>*/}
                        {/* {product.short_description} */}
                        <div
                            dangerouslySetInnerHTML={{
                                __html: product.short_description,
                            }}
                        ></div>
                    </ul>
                </div>
                <ModuleProductWideActions product={product} />
            </div>
        </div>
    );
};

export default ProductWide;
