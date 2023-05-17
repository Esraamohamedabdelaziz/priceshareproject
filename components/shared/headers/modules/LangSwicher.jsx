import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const LangSwicher = () => {
    const router = useRouter();
    const lang = router.locale;
    const { locale, push, reload, pathname } = useRouter();
    const onClick = async (nextLocale) => {
        await push(pathname, { locale: nextLocale });
        // force a reload for it to work correctly.
        reload();
    };
    console.log(router.pathname, 'pathname');
    return (
        <div className="ps-dropdown language">
            <a
                style={{
                    color: 'white',
                    textTransform: 'Uppercase',
                    fontSize: '90%',
                }}
                href="#"
                // onClick={() => {
                //     handleFeatureWillUpdate('en');
                // }}
            >
                {lang == 'en' ? (
                    <>
                        <img src="/static/img/flag/usa.png" />
                        English
                    </>
                ) : lang == 'ar' ? (
                    <>
                        <img src="/static/img/flag/uae.png" />
                        Arabic
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
                <li
                    style={{
                        width: '100%',
                        backgroundColor: 'white',
                    }}
                >
                    <div>
                        <a
                            href={`/en/${router.asPath}`}
                            locale="en"
                            // onClick={() => {onClick('en')}}
                            passHref
                            legacyBehavior
                        >
                            <a
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
                                English
                            </a>
                        </a>
                    </div>
                </li>
                <li
                    style={{
                        width: '100%',
                        backgroundColor: 'white',
                    }}
                >
                    <div>
                        <a
                            href={`/ar/${router.asPath}`}
                            locale="ar"
                            // onClick={() => {onClick('ar')}}
                            passHref
                            legacyBehavior
                        >
                            <a
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
                                Arabic
                            </a>
                        </a>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default LangSwicher;
