import React from 'react';
import {Link} from 'react-router-dom';

import './homepage.styles.scss';

import Directory from '../../components/directory-menu/directory-menu.component';

const HomePage = () => (

    <div className="homepage">
        <Link to="/shop/womens"><img className="promo-image" src="https://i.ibb.co/sJnfwLS/spring-promo.jpg" alt="Spring Promo"/></Link>
        <div className="department-message">New Styles In Every Department</div>
        <Directory />
    </div>
);

export default HomePage;