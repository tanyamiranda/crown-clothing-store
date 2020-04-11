import React from 'react';
import axios from 'axios';

import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {

    const priceInCents = price * 100;

    const publishableKey = "pk_test_JBKj5PjCB0wusPQxC2xRxqCB00QQYeQrI7";

    const processToken = token => {
        axios ({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceInCents,
                token
            }
        }).then(response => {
            console.log("Stripe response:",response);
            alert('Payment successful.');
        }).catch(error => {
            console.log("Payment error:", error);
            alert('There was an issue with your paument. Please make suer you used a TEST credit card.');            
        });
    }

    return (

        <StripeCheckout
            label="Pay Now"
            name="Urban Dragon Wear"
            billingAddress
            shippingAddress
            image=""
            description={`Your total is $${price}`}
            amount={priceInCents}
            panelLabel="Pay Now"
            token={processToken}
            stripeKey={publishableKey}
        />
    )
};

export default StripeCheckoutButton;