import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import './shop.styles.scss';

import CollectionsOverviewContainer from '../collections/collections-overview.container';
import CollectionFullViewContainer from '../collections/collection.container';
import {selectIsCollectionsLoaded} from '../../redux/shop/shop.selectors';
import {fetchCollectionStartAsync} from '../../redux/shop/shop.actions';

class ShopPage extends React.Component{

    componentDidMount() {

        const {isCollectionsLoaded} = this.props;

        //Only load collection upon app refresh, not each time this component loads.
        if (!isCollectionsLoaded) {
            const {fetchCollectionStartAsync} = this.props;
            fetchCollectionStartAsync();
        }
        
    }

    render() {

        const {match} = this.props;

        return (

            <div className="shop-page">
                <Route 
                    exact 
                    path ={`${match.path}`} 
                    component= {CollectionsOverviewContainer}
                />

                <Route 
                    path={`${match.path}:collectionId`} 
                    component = {CollectionFullViewContainer}
                />
            </div>

        )
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionsLoaded: selectIsCollectionsLoaded
})

const mapDispatchToProps = dispatch => ({
    fetchCollectionStartAsync : () => dispatch(fetchCollectionStartAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage); 
