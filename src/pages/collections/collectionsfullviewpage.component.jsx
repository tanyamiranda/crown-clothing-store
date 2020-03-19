import React from 'react';

import SHOP_DATA from './shop.data.js';

import CollectionFullView from '../../components/collection-view/collection-fullview.component';

class CollectionFullViewPage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            collections: SHOP_DATA,
            collectionName : props.collectionName
        }
    }



    render() {

        const {collections, collectionName} = this.state;

        const filteredCollection = collections.filter( 
            collection => collection.title.toLowerCase().match(`^` + collectionName.toLowerCase() + `$`)
        );

        return (
            
            <div className="shop-page">
               { 
                    filteredCollection.map(
                        ({id, ...collectionProps}) => (
                            <CollectionFullView key={id} {...collectionProps} />
                        )
                    )
                }
            </div>
        );
    }


}

export default CollectionFullViewPage;