import React from 'react';
import {Link} from 'react-router-dom';

import './banner-message.styles.scss';

const BannerMessage = () => (

    <div className="banner-message">
        <Link className="message-link" to="/shop/jackets">SPRING SALE! 50% OFF ALL JACKETS!</Link>
    </div>

);

export default BannerMessage;
