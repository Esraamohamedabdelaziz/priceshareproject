import React from 'react';
import Link from 'next/link';
import useTranslation from '~/config/lang';

const GardenAndKitchen = ({ data }) => {
    const { Translate: t } = useTranslation();

    return (
        <div className="ps-block--categories-box">
            <div className="ps-block__header">
                <h3>Home, Garden and Kitchen</h3>
                <ul>
                    <li>
                        <Link href="/shop">
                            <a>{t('new_arrivals')}</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/shop">
                            <a>Best Sellers</a>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="ps-block__content">
                {data &&
                    data.map((category) => {
                        if (category.type === 'large') {
                            return (
                                <div
                                    className="ps-block__banner"
                                    key={category.text}
                                >
                                    <img
                                        src={category.imagePath}
                                        alt="PriceShare"
                                    />
                                </div>
                            );
                        } else {
                            return (
                                <div
                                    className="ps-block__item"
                                    key={category.text}
                                >
                                    <Link href="/shop">
                                        <a className="ps-block__overlay"></a>
                                    </Link>
                                    <img
                                        src={category.imagePath}
                                        alt="PriceShare"
                                    />
                                    <p>{category.text} </p>
                                    <span>{category.item} Items</span>
                                </div>
                            );
                        }
                    })}
            </div>
        </div>
    );
};

export default GardenAndKitchen;
