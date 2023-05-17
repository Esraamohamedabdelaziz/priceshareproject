import React from 'react';
import Link from 'next/link';
import useTranslation from '~/config/lang';

const WidgetSaleOnSite = () => {
    const { Translate: t } = useTranslation();

    return (
        <aside className="widget widget_sell-on-site">
            <p style={{ color: 'black', display: 'block' }}>
                <i className="icon-store"></i> {t('sell_on_priceshare')}?
                <Link href="/vendor/become-a-vendor">
                    <a> Register Now!</a>
                </Link>
            </p>
        </aside>
    );
};

export default WidgetSaleOnSite;
