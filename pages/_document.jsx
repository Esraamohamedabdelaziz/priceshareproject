// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

import React from 'react';

export default class CustomDocument extends Document {
    render() {
        const { locale } = this.props.__NEXT_DATA__;
        const dir = locale === 'ar' ? 'rtl' : 'ltr';

        return (
            <Html dir={dir} lang={locale}>
                <Head>
                    <link rel="shortcut icon" href={'/static/img/favi.png'} />
                    <link
                        rel="icon"
                        href={'/static/img/favi.png'}
                        sizes="32x32"
                    />
                    <link
                        rel="icon"
                        href={'/static/img/favi.png'}
                        sizes="192x192"
                    />
                    <link
                        rel="apple-touch-icon-precomposed"
                        href={'/static/img/favi.png'}
                    />

                    {/* <link
                    href="https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700&amp;amp;subset=latin-ext"
                    rel="stylesheet"
                /> */}

                    {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossorigin
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&family=Zen+Kaku+Gothic+Antique&display=swap"
                    rel="stylesheet"
                /> */}
                    <link
                        href="http://fonts.cdnfonts.com/css/gobold"
                        rel="stylesheet"
                    />
                </Head>
                <body style={{ direction: dir }}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
