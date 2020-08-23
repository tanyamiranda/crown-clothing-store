import React from 'react';

import './footer.styles.scss';

const Footer = () => (
    <div className="footer-wrapper">
        <div className="footer">

            <div className="section">
                <div className="section-name">ABOUT US</div>
                <div className="section-link">About Urban Dragon</div>
                <div className="section-link">Careers</div>
                <div className="section-link">Terms of Use</div>
                <div className="section-link">Privacy Policy</div>
                <div className="section-link">Community Outreach</div>
            </div>

            <div className="section">
                <div className="section-name">CUSTOMER SERVICE</div>
                <div className="section-link">Order Status</div>
                <div className="section-link">My Account</div>
                <div className="section-link">Shipping</div>
                <div className="section-link">Return Policy</div>
                <div className="section-link">Contact Us</div>
            </div>
        </div>
        <div className="copyright">© 2020 Urban Dragon. All Rights Reserved.</div>
    </div>
);

export default Footer;