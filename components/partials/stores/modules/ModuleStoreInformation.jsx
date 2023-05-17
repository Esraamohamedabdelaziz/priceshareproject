import { useRouter } from 'next/router';
import React from 'react';
import Rating from '~/components/elements/Rating';

const ModuleStoreInformation = ({ store }) => {
    const router = useRouter();
    if (store) {
        return (
            <div className="ps-block--vendor">
                <div className="ps-block__thumbnail">
                    <img src={store.logo} alt="PriceShare" />
                </div>
                <div className="ps-block__container">
                    <div className="ps-block__header">
                        <h4 className="makeItFlex">
                            {router.locale == 'ar' ? store.name_ar : store.name}
                        </h4>
                        <Rating
                            rating={
                                store && store.rating
                                    ? ((store.rating * 100) / 5).toString() +
                                      '%'
                                    : '0%'
                            }
                        />
                        <p>
                            <strong className="makeItFlex">
                                {(store.rating * 100) / 5}% Positive
                            </strong>
                            . ({store.rating_count})
                        </p>
                    </div>
                    <div className="ps-block__divider"></div>
                    <div className="ps-block__content">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: store.description,
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        );
    } else {
        retu;
    }
};

export default ModuleStoreInformation;
