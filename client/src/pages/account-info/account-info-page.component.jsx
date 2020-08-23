import React from 'react';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';

import './account-info-page.styles.scss';

import CustomButton from '../../components/custom-button/custom-button.component';
import {selectCurrentUser, selectOrderHistory} from '../../redux/user/user.selectors';
import {signOutStart} from '../../redux/user/user.actions';
import {formatDisplayDate, formatDisplayDollarValue} from '../../components/formatting/display-formatting';

const AccountInfoPage = ({currentUser, history, signOutStart, orderHistory}) => {
       
    // This is added because this page loads quicker than the redux commands execute.
    if (!currentUser.email)
        return null;

    return (
        <div>
            <div className="account-info-wrapper">
                <div className="account-info">
                    <h1 className="title">Account Details</h1>
                    <div className="details">
                        <span className="detail">
                            <span className="label">Account Id:</span>
                            <span className="data">{currentUser.createdDate.seconds}</span>
                        </span>
                        <span className="detail">
                            <span className="label">Name:</span>
                            <span className="data">{currentUser.displayName}</span>
                        </span>
                        <span className="detail">
                            <span className="label">Email:</span>
                            <span className="data">{currentUser.email}</span>
                        </span>
                        <span className="detail">
                            <span className="label">Date Created:</span>
                            <span className="data">{formatDisplayDate(currentUser.createdDate.seconds)}</span>
                        </span>
                        
                    </div>
                    <div className="order-history">
                        <div className="title">OrderHistory</div>
                        <div className="detail" key="header">
                            <span><b>OrderId</b></span>
                            <span className="center-align"><b>Date</b></span>
                            <span className="center-align"><b>Status</b></span>
                            <span className="dollar-value"><b>Total</b></span>
                        </div>
                        {
                            orderHistory.length > 0 ?
                                orderHistory.map(order => (
                                    <div className="detail" key={order.id} >
                                        <span><Link className="link" to={`/orderdetails/${order.id}`}>{order.id}</Link></span>
                                        <span className="center-align">{formatDisplayDate(order.id)}</span>                                
                                        <span className="center-align">{order.orderStatus}</span>
                                        <span className="dollar-value">{formatDisplayDollarValue(order.orderTotal)}</span>
                                    </div>
                                
                                ))
                            :
                                <div>You have no orders.</div>
                        }    
                        
                    </div>
                    <div className="buttons">
                        <CustomButton onClick={signOutStart}>SIGN OUT</CustomButton>
                        <CustomButton onClick={() => history.push('/shop')} isActionButton={true} >Continue Shopping</CustomButton>
                    </div>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = createStructuredSelector ({
    currentUser : selectCurrentUser,
    orderHistory : selectOrderHistory
});

const mapDispatchToProps = (dispatch) => ({
    signOutStart: () => dispatch(signOutStart())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (AccountInfoPage));