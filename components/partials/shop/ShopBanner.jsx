import { Spin } from 'antd';
import React from 'react';
import Slider from 'react-slick';
import NextArrow from '~/components/elements/carousel/NextArrow';
import PrevArrow from '~/components/elements/carousel/PrevArrow';

const ShopBanner = ({ bannerItems }) => {
    const carouselSetting = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        autoplay: true,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };
    if (!bannerItems)
        return (
            <>
                <Spin />
            </>
        );
    return (
        <div className="ps-shop-banner">
            <Slider {...carouselSetting} fade={true} className="ps-carousel">
                <a
                    href={
                        bannerItems?.shop_section_a_gallery_files_images_list[0]
                            ?.hyperlink
                    }
                >
                    <img
                        style={{ height: '416px', objectFit: 'cover' }}
                        src={
                            bannerItems
                                ?.shop_section_a_gallery_files_images_list[0]
                                ?.url
                        }
                        alt="PriceShare"
                    />
                </a>
                <a
                    href={
                        bannerItems?.shop_section_a_gallery_files_images_list[1]
                            ?.hyperlink
                    }
                >
                    <img
                        style={{ height: '416px', objectFit: 'cover' }}
                        src={
                            bannerItems
                                ?.shop_section_a_gallery_files_images_list[1]
                                ?.url
                        }
                        alt="PriceShare"
                    />
                </a>
            </Slider>
        </div>
    );
};

export default ShopBanner;
