import React, { useEffect, useState } from 'react';
import { useTranslation, withTranslation, Trans } from 'react-i18next';

const LanguageSwicher = () => {
    const { t, i18n } = useTranslation();
    const [lang, setLang] = useState('en');
    const [langOptions, setLangOptions] = useState([]);
    const [country, setCountry] = useState('us');

    useEffect(() => {
        i18n.changeLanguage('en');
        setLangOptions([]);

        if (process.browser && JSON.parse(localStorage.getItem('store'))) {
            setLangOptions(
                JSON.parse(localStorage.getItem('store'))['languages']
            );
            setCountry(JSON.parse(localStorage.getItem('store'))['country']);
        }
    }, []);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        if (lng === 'ar') {
            setLang(lng);
            document.getElementsByTagName('body')[0].setAttribute('dir', 'rtl');
        } else {
            setLang(lng);
            document.getElementsByTagName('body')[0].setAttribute('dir', 'ltr');
        }
    };

    const handleFeatureWillUpdate = (lng) => {
        console.log(lng);
        changeLanguage(lng);
        /*notification.open({
            message: 'Opp! Something went wrong.',
            description: 'This feature has been updated later!',
            duration: 500,
        });*/
    };

    return (
        <div className="ps-dropdown language">
            <a
                style={{
                    color: 'white',
                    textTransform: 'Uppercase',
                    fontSize: '90%',
                }}
                href="#"
                onClick={() => {
                    handleFeatureWillUpdate('en');
                }}
            >
                {lang == 'en' ? (
                    <>
                        <img src="/static/img/flag/usa.png" />
                        {t('english')}
                    </>
                ) : lang == 'sv' ? (
                    <>
                        <img src="/static/img/flag/sv.png" />
                        {t('swedish')}
                    </>
                ) : lang == 'ar' && country == 'uae' ? (
                    <>
                        <img src="/static/img/flag/uae.png" />
                        {t('arabic')}
                    </>
                ) : lang == 'ar' && country == 'om' ? (
                    <>
                        <img src="/static/img/flag/om.png" />
                        {t('arabic')}
                    </>
                ) : lang == 'ar' && country == 'lbn' ? (
                    <>
                        <img src="/static/img/flag/lbn.png" />
                        {t('arabic')}
                    </>
                ) : lang == 'ar' && country == 'egy' ? (
                    <>
                        <img src="/static/img/flag/uae.png" />
                        {t('arabic')}
                    </>
                ) : (
                    ''
                )}
            </a>
            <ul
                className="ps-dropdown-menu"
                style={{
                    // height: '200px',
                    backgroundColor: 'white',
                }}
            >
                {langOptions.includes('en') ? (
                    <>
                        <li
                            style={{
                                width: '100%',
                                backgroundColor: 'white',
                            }}
                        >
                            <div>
                                <a
                                    href="#"
                                    onClick={() => {
                                        handleFeatureWillUpdate('en');
                                    }}
                                    style={{
                                        color: '#000',
                                        fontSize: '90%',
                                    }}
                                >
                                    <img
                                        src="/static/img/flag/usa.png"
                                        alt="PriceShare"
                                        style={{
                                            width: '18px',
                                        }}
                                    />
                                    {t('english')}
                                </a>
                            </div>
                        </li>
                    </>
                ) : (
                    ''
                )}

                {langOptions.includes('sv') ? (
                    <>
                        <li>
                            <div
                                style={{
                                    width: '100%',
                                    backgroundColor: 'white',
                                }}
                            >
                                <a
                                    href="#"
                                    onClick={() => {
                                        handleFeatureWillUpdate('sv');
                                    }}
                                    style={{
                                        color: '#000',
                                        fontSize: '90%',
                                    }}
                                >
                                    <img
                                        src="/static/img/flag/sv.png"
                                        alt="PriceShare"
                                        style={{
                                            width: '18px',
                                        }}
                                    />
                                    {t('swedish')}
                                </a>
                            </div>
                        </li>
                    </>
                ) : (
                    ''
                )}

                {langOptions.includes('ar') && country === 'uae' ? (
                    <>
                        <li>
                            <div
                                style={{
                                    width: '100%',
                                    backgroundColor: 'white',
                                }}
                            >
                                <a
                                    href="#"
                                    onClick={() => {
                                        handleFeatureWillUpdate('ar');
                                    }}
                                    style={{
                                        color: '#000',
                                        fontSize: '90%',
                                    }}
                                >
                                    <img
                                        src="/static/img/flag/uae.png"
                                        alt="PriceShare"
                                        style={{
                                            width: '18px',
                                        }}
                                    />
                                    {t('arabic')}
                                </a>
                            </div>
                        </li>
                    </>
                ) : (
                    ''
                )}

                {langOptions.includes('ar') && country === 'om' ? (
                    <>
                        <li>
                            <div
                                style={{
                                    width: '100%',
                                    backgroundColor: 'white',
                                }}
                            >
                                <a
                                    href="#"
                                    onClick={() => {
                                        handleFeatureWillUpdate('ar');
                                    }}
                                    style={{
                                        color: '#000',
                                        fontSize: '90%',
                                    }}
                                >
                                    <img
                                        src="/static/img/flag/om.png"
                                        alt="PriceShare"
                                        style={{
                                            width: '18px',
                                        }}
                                    />
                                    {t('arabic')}
                                </a>
                            </div>
                        </li>
                    </>
                ) : (
                    ''
                )}

                {langOptions.includes('ar') && country === 'lbn' ? (
                    <>
                        <li>
                            <div
                                style={{
                                    width: '100%',
                                    backgroundColor: 'white',
                                }}
                            >
                                <a
                                    href="#"
                                    onClick={() => {
                                        handleFeatureWillUpdate('ar');
                                    }}
                                    style={{
                                        color: '#000',
                                        fontSize: '90%',
                                    }}
                                >
                                    <img
                                        src="/static/img/flag/lbn.png"
                                        alt="PriceShare"
                                        style={{
                                            width: '18px',
                                        }}
                                    />
                                    {t('arabic')}
                                </a>
                            </div>
                        </li>
                    </>
                ) : (
                    ''
                )}
                {langOptions.includes('ar') && country === 'egy' ? (
                    <>
                        <li>
                            <div
                                style={{
                                    width: '100%',
                                    backgroundColor: 'white',
                                }}
                            >
                                <a
                                    href="#"
                                    onClick={() => {
                                        handleFeatureWillUpdate('ar');
                                    }}
                                    style={{
                                        color: '#000',
                                        fontSize: '90%',
                                    }}
                                >
                                    <img
                                        src="/static/img/flag/uae.png"
                                        alt="PriceShare"
                                        style={{
                                            width: '18px',
                                        }}
                                    />
                                    {t('arabic')}
                                </a>
                            </div>
                        </li>
                    </>
                ) : (
                    ''
                )}
            </ul>
        </div>
    );
};

export default LanguageSwicher;
