import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import './account-order-details.styles.scss';

import ErrorMessage from '../../components/error-message/error-message.component';
import OrderDetails from '../../components/order-details/order-details.component';
import {selectCurrentUser, selectOrderFromOrderHistory} from '../../redux/user/user.selectors'

const AccountOrderDetailsPage = ({order,currentUser}) => {
   
    const isAuthorized = order && order.email === currentUser.email;

    if (!order || !isAuthorized)
        return(
            <ErrorMessage />
        )
    else
        return (
            <div className="account-order-details">
                <h1 className="title">Order Details</h1>
                    <OrderDetails key={order.id} order={order} /> 
            </div>
        );
}

const mapStateToProps = (state, ownProps) => ({
    currentUser : selectCurrentUser(state),
    order: selectOrderFromOrderHistory(Number(ownProps.match.params.orderId))(state)
})

export default withRouter(connect(mapStateToProps)(AccountOrderDetailsPage)); 
