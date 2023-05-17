import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import MediaRepository from '~/repositories/MediaRepository';
import { getItemBySlug } from '~/utilities/product-helper';
import Promotion from '~/components/elements/media/Promotion';

const HomeAds = ({ bannerItems }) => {
    return (
        <div className="ps-home-ads">
            <div className="ps-container">
                <div className="row">
                    <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 ">
                        {bannerItems?.homepage_section_cover_file_images_list[0]
                            ?.url && (
                            <Promotion
                                link={
                                    bannerItems
                                        ?.homepage_section_cover_file_images_list[0]
                                        ?.hyperlink
                                }
                                image={
                                    bannerItems
                                        ?.homepage_section_cover_file_images_list[0]
                                        ?.url
                                }
                                postion="TopRight"
                            />
                        )}
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                        {bannerItems?.homepage_section_side_file_images_list[0]
                            ?.url && (
                            <Promotion
                                link={
                                    bannerItems
                                        ?.homepage_section_side_file_images_list[0]
                                        ?.hyperlink
                                }
                                image={
                                    bannerItems
                                        ?.homepage_section_side_file_images_list[0]
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
export default HomeAds;
