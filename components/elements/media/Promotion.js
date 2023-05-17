import React from 'react';
import Link from 'next/link';
import { baseUrl } from '~/repositories/Repository';

const Promotion = ({ link, image, postion }) => {
    if (image) {
        return (
            <>
                <a className="ps-collection" href={link}>
                    <img
                        src={image}
                        alt="PriceShare"
                        style={{ height: '240px' }}
                    />
                    {/* {postion === 'TopRight' ? (
                        <div className="imageDetailsContainer">
                            <div className="detailsContainer">
                                <h1 className="productName">Product Name </h1>
                                <h4 className="productDetails">
                                    Experience with the best smartphone on the
                                    world
                                </h4>
                                <h6 className="priceTag">$599</h6>
                            </div>
                        </div>
                    ) : null} */}
                </a>
            </>
        );
    } else {
        return (
            <Link href={link ? link : '/shop'}>
                <a className="ps-collection">
                    <img
                        src="/static/img/not-found.jpg"
                        alt="PriceShare"
                        style={{ height: '240px', objectFit: 'cover' }}
                    />
                </a>
            </Link>
        );
    }
};

export default Promotion;
