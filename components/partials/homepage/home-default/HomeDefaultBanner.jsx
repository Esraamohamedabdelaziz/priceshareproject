import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import NextArrow from '~/components/elements/carousel/NextArrow';
import PrevArrow from '~/components/elements/carousel/PrevArrow';
import Link from 'next/link';
import MediaRepository from '~/repositories/MediaRepository';
import { baseUrl } from '~/repositories/Repository';
import { getItemBySlug } from '~/utilities/product-helper';
import Promotion from '~/components/elements/media/Promotion';
import useTranslation from '~/config/lang';
import GeneralService from '~/services/GeneralService';
import { Spin } from 'antd';

const HomeDefaultBanner = ({ bannerItems }) => {
    const [promotion1, setPromotion1] = useState(null);
    const [promotion2, setPromotion2] = useState(null);
    const { Translate: t } = useTranslation();

    // async function getBannerItems() {
    //     const responseData = await MediaRepository.getBannersBySlug(
    //         'banner-home-fullwidth'
    //     );

    //     if (responseData) {
    //         // console.log(responseData)
    //         setBannerItems(responseData);
    //     }
    // }

    const carouselSetting = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: 'ease-out',
        pauseOnHover: false,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    if (!bannerItems) return <Spin />;
    // Views
    let mainCarouselView;
    if (bannerItems) {
        const carouseItems =
            bannerItems?.homepage_section_a_gallery_files_images_list?.map(
                (item) => (
                    <div className="slide-item" key={item.id}>
                        <a href={item.hyperlink}>
                            <div
                                className="ps-banner-item--default bg--cover"
                                style={{
                                    backgroundImage: `url(${item.url})`,
                                }}
                            >
                                {/* <div id="details-Container">
                        <div id="buttonAndTextWrapper">
                            <h6 id="editionText"> {t("limited_edition")}</h6>
                            <span id="offerDetails">
                                Scandinvian Collection For your Bedroom Just
                                <span id="priceText"> $599</span>
                            </span>

                            <Link href="/shop">
                                <a id="shopNowButton">
                                    <h6 id="shopNowText">{t("shop_now")}</h6>
                                </a>
                            </Link>
                        </div>
                    </div> */}
                            </div>
                        </a>
                    </div>
                )
            );
        mainCarouselView = (
            <Slider {...carouselSetting} className="ps-carousel">
                {carouseItems}
            </Slider>
        );
    }
    return (
        <div className="ps-home-banner ps-home-banner--1">
            <div className="ps-container">
                <div className="ps-section__left">
                    {/*<video  maxheight="425" controls>
                        <source src="/static/videos/ps-video.mp4" type="video/mp4"/>
                    </video>*/}
                    {mainCarouselView}
                    {/* <div align="center">
                        <h3 align="center">{t('home_video')}</h3>
                    </div> */}
                </div>
                <div className="ps-section__right">
                    {bannerItems?.homepage_section_a_side_files_images_list[0]
                        ?.url && (
                        <Promotion
                            link={
                                bannerItems
                                    ?.homepage_section_a_side_files_images_list[0]
                                    ?.hyperlink
                            }
                            image={
                                bannerItems
                                    ?.homepage_section_a_side_files_images_list[0]
                                    ?.url
                            }
                            postion="TopRight"
                        />
                    )}
                    {bannerItems?.homepage_section_a_side_files_images_list[1]
                        ?.url && (
                        <Promotion
                            link={
                                bannerItems
                                    ?.homepage_section_a_side_files_images_list[1]
                                    ?.hyperlink
                            }
                            image={
                                bannerItems
                                    ?.homepage_section_a_side_files_images_list[1]
                                    ?.url
                            }
                            postion="TopRight"
                        />
                    )}
                    {/* <Promotion
                        link="/shop"
                        image={promotion1 ? promotion1.image : null}
                        postion="TopRight"
                    /> */}
                </div>
            </div>
        </div>
    );
};

export default HomeDefaultBanner;
