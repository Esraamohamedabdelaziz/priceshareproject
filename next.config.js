/*
* PriceShare - Multipurpose Marketplace React Ecommerce Template v2.2.0
* Author: nouthemes
* Homepage: https://themeforest.net/user/nouthemes/portfolio
* Created at: 2019-11-15T08:00:00+07:00
* Update at: 2021-07-13T00:11:04+07:00

* */

const nextSettings = {
    typescript: {
        ignoreBuildErrors: true,
    },
    optimizeFonts: false,
    // disable eslint
    eslint: {
        ignoreDuringBuilds: true,
    },
    // Change your site title here
    env: {
        title: 'PriceShare',
        titleDescription: 'Multipurpose Marketplace React Ecommerce Template',
    },
    i18n: {
        locales: ['en', 'ar'],
        defaultLocale: 'en',
    },
};

module.exports = nextSettings;
