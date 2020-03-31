import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {withRouter} from 'react-router-dom';

//import './collections-overview.styles.scss';

import CollectionPreview from '../../components/collection-view/collection-preview.component';

import {selectCollections} from '../../redux/shop/shop.selectors';

const CollectionsOverview = ({collections}) => (

    <div className="collections-overview">
        { 
            collections.map(
                ({id, ...collectionProps}) => (
                    <CollectionPreview key={id} count={4} viewAll={false} {...collectionProps} />
                )
            )
        }
    </div>
);
    
const mapStateToProps = createStructuredSelector ({
    collections : selectCollections
});

export default withRouter(connect(mapStateToProps)(CollectionsOverview)); 