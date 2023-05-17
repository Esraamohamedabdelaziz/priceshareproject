import React from 'react';

const Rating = ({ rating }) => {
    const rate = Math.floor(rating) || 0;
    return (
        <div style={{ display: 'flex', color: '#808080' }}>
            <div style={{ display: 'flex', position: 'relative' }}>
                <i className="fa fa-star" style={{ ariaHidden: 'true' }}></i>
                <i className="fa fa-star" style={{ ariaHidden: 'true' }}></i>
                <i className="fa fa-star" style={{ ariaHidden: 'true' }}></i>
                <i className="fa fa-star" style={{ ariaHidden: 'true' }}></i>
                <i className="fa fa-star" style={{ ariaHidden: 'true' }}></i>

                <div
                    style={{
                        display: 'flex',
                        position: 'absolute',
                        overflow: 'hidden',
                        color: '#FFBC0B',
                        width: '100%',
                    }}
                >
                    {Array.from(Array(rate).keys())?.map((data) => {
                        return (
                            <i
                                className="fa fa-star"
                                style={{ ariaHidden: 'true' }}
                            ></i>
                        );
                    })}
                    {/* <i className="fa fa-star" style={{ ariaHidden: 'true' }}></i>
                <i className="fa fa-star" style={{ ariaHidden: 'true' }}></i>
                <i className="fa fa-star" style={{ ariaHidden: 'true' }}></i>
                <i className="fa fa-star" style={{ ariaHidden: 'true' }}></i>
                <i className="fa fa-star" style={{ ariaHidden: 'true' }}></i> */}
                </div>
            </div>
        </div>
    );
};

export default Rating;
