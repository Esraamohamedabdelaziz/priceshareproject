import React from 'react';
import Link from 'next/link';
import useTranslation from '~/config/lang';

const ModuleProductDetailDescription = ({ product }) => {
    const { Translate: t } = useTranslation();
    return (
        <div className="ps-product__desc">
            <p>
                {t('sold_by')}:
                <Link href={`/store/${product.vendor_id}`}>
                    <a>
                        <strong>&nbsp; {product.vendor_name}</strong>
                    </a>
                </Link>
            </p>
            <ul className="ps-list--dot">
                <div
                    dangerouslySetInnerHTML={{
                        __html: product.short_description,
                    }}
                ></div>
                {/* <li>Unrestrained and portable active stereo speaker</li>
            <li> Free from the confines of wires and chords</li>
            <li> 20 hours of portable capabilities</li>
            <li>Double-ended Coil Cord with 3.5mm Stereo Plugs Included</li>
            <li> 3/4″ Dome Tweeters: 2X and 4″ Woofer: 1X</li>*/}
            </ul>
        </div>
    );
};

export default ModuleProductDetailDescription;
