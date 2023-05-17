import React from 'react';

const PartialVendor = ({ vendor_description }) => (
    <div className="ps-document">
        <div dangerouslySetInnerHTML={{ __html: vendor_description }}></div>
    </div>
);

export default PartialVendor;
