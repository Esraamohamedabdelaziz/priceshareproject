import React from 'react';
import Link from 'next/link';

const ContactMap = () => (
    <div className="ps-contact-map">
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d231280.36550199054!2d55.08740395679413!3d25.076267693528973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sus!4v1670591957474!5m2!1sen!2sus"
            height={500}
        ></iframe>
    </div>
);

export default ContactMap;
