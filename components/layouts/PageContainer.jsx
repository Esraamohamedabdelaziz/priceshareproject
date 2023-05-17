import React from 'react';
import Head from 'next/head';
import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import HeaderMobile from '~/components/shared/headers/HeaderMobile';
import FooterFullwidth from '~/components/shared/footers/FooterFullwidth';
import useTranslation from '~/config/lang';

const initHeaders = (
    <>
        <HeaderDefault />
        <HeaderMobile />
    </>
);
const initFooters = (
    <>
        <FooterFullwidth />
    </>
);

const PageContainer = ({
    header = initHeaders,
    footer = initFooters,
    children,
    title = 'Page',
}) => {
    const { Translate: t } = useTranslation();

    let titleView;

    if (title !== '') {
        titleView = 'PriceShare' + ' | ' + title;
    } else {
        titleView = 'PriceShare' + ' | ' + process.env.titleDescription;
    }

    return (
        <>
            <Head>
                <title>{titleView}</title>
            </Head>
            {header}
            {children}
            <div
                className="ps-newsletter"
                style={{ maxWidth: '1650px', margin: '0 auto' }}
            >
                {footer}
            </div>
        </>
    );
};

export default PageContainer;
