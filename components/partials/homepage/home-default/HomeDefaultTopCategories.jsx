import React from 'react';
import Link from 'next/link';
import useTranslation from '~/config/lang';
import menuData from '~/public/static/data/menu';
import { getTextLang } from '~/components/shared/panel/PanelMenu';

const HomeDefaultTopCategories = () => {
    const { Translate: t } = useTranslation();

    const productCategories = menuData.product_categories;
    return (
        <div className="ps-top-categories">
            <div className="ps-container">
                <h3
                    style={{
                        color: 'black',
                    }}
                >
                    {t('top_month_categories')}
                </h3>
                <div className="row">
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop?category=5">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/img/categories/furniture/12.png"
                                alt="PriceShare"
                            />
                            <p>{getTextLang(productCategories[5])}</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop?category=4">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/img/categories/kitchen/5.jpg"
                                alt="PriceShare"
                            />
                            <p>{getTextLang(productCategories[4])}</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop?category=1">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/img/categories/8.jpg"
                                alt="PriceShare"
                            />
                            <p>{getTextLang(productCategories[2])}</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop?category=2">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/img/categories/4.jpg"
                                alt="PriceShare"
                            />
                            <p>{getTextLang(productCategories[1])}</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop?category=6">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/img/categories/2.jpg"
                                alt="PriceShare"
                            />
                            <p>{getTextLang(productCategories[6])}</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop?category=8">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/img/categories/5.jpg"
                                alt="PriceShare"
                            />
                            <p>{getTextLang(productCategories[8])}</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop?category=3">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/img/categories/technology/5.jpg"
                                alt="PriceShare"
                            />
                            <p>{getTextLang(productCategories[3])}</p>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                        <div className="ps-block--category">
                            <Link href="/shop?category=7">
                                <a className="ps-block__overlay"></a>
                            </Link>
                            <img
                                src="/static/img/categories/7.jpg"
                                alt="PriceShare"
                            />
                            <p>{getTextLang(productCategories[7])}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeDefaultTopCategories;
