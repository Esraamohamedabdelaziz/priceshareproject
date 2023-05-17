import React, { useEffect, useState } from 'react';

import MediaRepository from '~/repositories/MediaRepository';
import { getItemBySlug } from '~/utilities/product-helper';
import Promotion from '~/components/elements/media/Promotion';

const HomeAdsColumns = ({ bannerItems }) => {
    return (
        <div className="ps-home-ads">
            <div className="ps-container">
                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                        {bannerItems
                            ?.homepage_section_b_gallery_files_images_list[0]
                            ?.url && (
                            <Promotion
                                link={
                                    bannerItems
                                        ?.homepage_section_b_gallery_files_images_list[0]
                                        ?.hyperlink
                                }
                                image={
                                    bannerItems
                                        ?.homepage_section_b_gallery_files_images_list[0]
                                        ?.url
                                }
                                postion="TopRight"
                            />
                        )}
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                        {bannerItems
                            ?.homepage_section_b_gallery_files_images_list[1]
                            ?.url && (
                            <Promotion
                                link={
                                    bannerItems
                                        ?.homepage_section_b_gallery_files_images_list[1]
                                        ?.hyperlink
                                }
                                image={
                                    bannerItems
                                        ?.homepage_section_b_gallery_files_images_list[1]
                                        ?.url
                                }
                                postion="TopRight"
                            />
                        )}
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                        {bannerItems
                            ?.homepage_section_b_gallery_files_images_list[2]
                            ?.url && (
                            <Promotion
                                link={
                                    bannerItems
                                        ?.homepage_section_b_gallery_files_images_list[2]
                                        ?.hyperlink
                                }
                                image={
                                    bannerItems
                                        ?.homepage_section_b_gallery_files_images_list[2]
                                        ?.url
                                }
                                postion="TopRight"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeAdsColumns;
