import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

import './shop.styles.scss';

import CollectionsOverview from '../collections/collections-overview.component';
import CollectionFullPage from '../collections/collection.component';
import {firestore, convertCollectionSnapshotToMap} from '../../firebase/firebase.utils';
import {updateCollections} from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionFullPageWithSpinner = WithSpinner(CollectionFullPage);

class ShopPage extends React.Component{

    state = {
        isLoading: true
    };

    unsubscribeFromSnapshot = null;  //function placeholder for the signout call

    componentDidMount() {

        const collectionRef = firestore.collection("collections").orderBy("sortOrder", "asc");

        const {updateCollections} = this.props;

        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
            async snapshot => {
                const collectionsMap = convertCollectionSnapshotToMap(snapshot);
                updateCollections(collectionsMap);
                this.setState({isLoading: false});
            }
        );

    }

    render() {

        const {match} = this.props;
        const {isLoading} = this.state;

        return (

            <div className="shop-page">
                <Route 
                    exact path ={`${match.path}`} 
                    render= {(props) => <CollectionsOverviewWithSpinner isLoading={isLoading} {...props} />}
                />

                <Route 
                    path={`${match.path}:collectionId`} 
                    render= {(props) => <CollectionFullPageWithSpinner isLoading={isLoading} {...props} />}
                />
            </div>

        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections : collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage); 
