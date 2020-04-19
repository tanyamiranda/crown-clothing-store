import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

import {selectCartItems} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {createOrderStart} from '../../redux/order/order.actions';
import {fetchCurrentUserOrdersStart} from '../../redux/user/user.actions';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price, cartItems, currentUser, createOrderStart, fetchCurrentUserOrdersStart, history}) => {

    const priceInCents = price * 100;
    const email = !currentUser ? null : currentUser.email ;
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
            //console.log("Success! Stripe response:",response);
            createOrder(token);
            if (currentUser) fetchCurrentUserOrdersStart();
            history.push("/confirmation");
        }).catch(error => {
            console.log("Payment error:", error);
            alert('There was an issue with your paument. Please make suer you used a TEST credit card.');            
        });
    }

    const createOrder = token => {

        const orderData = {
            email: token.email,
            phone: '1-212-999-8888 x1234',
            orderStatus: "processing",
            orderTotal: price,
            currency: "usd",
            paymentInfo: {
                paymentType: token.card.brand,
                last4: token.card.last4,
                nameOnCard: "John A. Smith",
                authorizationId: "9999999999",
                billingAddress: {
                    name: "John Smith",
                    line1: "100 Billing Blvd",
                    line2: "Apt 1A",
                    city: "New York",
                    state: "NY",
                    zip: "10001"	
                },
            },
            shippingInfo: {
                shippingMethod: "UPS2DAY",
                shippingAddress: {
                    name: "Mary Smith",
                    line1: "200 Shipping Street",
                    line2: "1st Floor",
                    city: "New York",
                    state: "NY",
                    zip: "10002"	
                }
            },
            orderItems: cartItems
        }

        //console.log("orderData=",orderData);
        createOrderStart(orderData);
    }

   

    return (

        <div>
            <StripeCheckout
            label="Pay With Card"
            name="Urban Dragon Wear"
            email={email}
            image="https://i.ibb.co/TM18jP3/dragonlogosmall.png"
            description={`Your total is $${price}`}
            amount={priceInCents}
            panelLabel="Pay Now"
            token={processToken}
            stripeKey={publishableKey}
            />
        </div>
    )
};

const mapStateToProps = createStructuredSelector ({
    cartItems: selectCartItems,
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    createOrderStart : (cartItems, paymentToken) => dispatch(createOrderStart(cartItems, paymentToken)),
    fetchCurrentUserOrdersStart: () => dispatch(fetchCurrentUserOrdersStart()) 
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(StripeCheckoutButton));